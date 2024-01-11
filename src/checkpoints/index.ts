import { Request, Response, Router } from "express"
import { createCheckPoint, createCheckPoints, findCheckpointByDay, findCheckpointByIdByCurrentDate, getAllCheckpoints, getCheckpointAgency, getCheckpointAgencyWithFilter, getCheckpointByIDByDate, getUserCheckpoints, markCheckPoint } from "./checkpoints.repository.js"
import { findAllUsers } from "../signup/signup.repository.js"
import { dateTime, vacation } from "../functions.js"

const route = Router()

route.get("/teste", async (req: Request, res: Response) => {
    const todayIsHoliday = () => {
        const { day, month, year, dayOfWeek } = dateTime()
        const feriados = vacation()
        const today = `${day}/${month}/${year}`

        const eFeriado = feriados.find((dia) => dia.date === today)
        const sabado = 6
        const domingo = 7

        const isHoliday = (eFeriado !== undefined) || (dayOfWeek === domingo) || (dayOfWeek === sabado)

        return isHoliday
    }

    console.log(todayIsHoliday())
})

const todayIsHoliday = () => {
    const { day, month, year, dayOfWeek } = dateTime()
    const feriados = vacation()
    const today = `${day}/${month}/${year}`

    const eFeriado = feriados.find((dia) => dia.date === today)
    const sabado = 6
    const domingo = 7

    const isHoliday = (eFeriado !== undefined) || (dayOfWeek === domingo) || (dayOfWeek === sabado)

    return isHoliday
}

//CRIA TODOS OS CHECKPOINTS DOS USUÁRIOS *****
route.post("/checkpoints/createall", async (req: Request, res: Response) => {
    const { day, month, year, dayOfWeek } = dateTime()

    try {
        const checkpointsExist = await findCheckpointByDay()

        if (checkpointsExist.length !== 0) return res.sendStatus(400)

        const allUsers = await findAllUsers()
 
        
        if (!todayIsHoliday() && dayOfWeek !== 6 && dayOfWeek !== 7) {
            const checkpointData = allUsers.map((user) => {
                return {
                    userId: user.id,
                    day: Number(day),
                    month: Number(month),
                    year: Number(year)
                }
            })

            await createCheckPoints(checkpointData)

            res.status(200).send("Checkpoints Created")
        } else if (dayOfWeek === 6) {
            const checkpointData = allUsers.filter((user) =>  user.saturday === true )
            const checkpointSaturday = checkpointData.map((user) => {
                return {
                    userId: user.id,
                    day: Number(day),
                    month: Number(month),
                    year: Number(year)
                }
            })

            console.log(checkpointSaturday)
            await createCheckPoints(checkpointSaturday)

            res.status(200).send("Checkpoints Created")
        } else if (dayOfWeek === 7) {
            const checkpointData = allUsers.filter((user) =>  user.sunday === true )
            const checkpointSunday = checkpointData.map((user) => {
                return {
                    userId: user.id,
                    day: Number(day),
                    month: Number(month),
                    year: Number(year)
                }
            })

            await createCheckPoints(checkpointSunday)

            res.status(200).send("Checkpoints Created")
        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//CRIAR CHECKPOINT DO USUÁRIO****
route.post("/checkpoint/create=:id", async (req: Request, res: Response) => {
    const checkpointData = req.body as { day: number, month: number, year: number }
    const { id } = req.params

    const checkpointDateFormated = {
        userId: Number(id),
        day: Number(checkpointData.day),
        month: Number(checkpointData.month),
        year: Number(checkpointData.year)
    }

    console.log(checkpointData, id)

    try {
        const sucess = await createCheckPoint(checkpointDateFormated)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }


})

//ATUALIZAR O CHECKPOINT *****
route.put("/checkpoint", async (req: Request, res: Response) => {
    const { checkpointId } = req.body
    const { hour, minute } = dateTime()

    const markCheckPointData = {
        checkpointId,
        arrived: true,
        arrivalTime: `${hour}:${minute}`
    }

    try {
        const sucess = await markCheckPoint(markCheckPointData)
        res.status(200).send({ sucess, message: "Checkpoint atualizado." })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//PEGAR TODOS OS CHECKPOINTS DO USUÁRIO *****
route.get("/checkpoints/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId

    try {
        const sucess = await getUserCheckpoints(Number(userId))
        console.log(sucess)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

//PEGAR TODOS OS CHECKPOINTS *****
route.get("/checkpoints", async (req: Request, res: Response) => {

    try {
        const sucess = await getAllCheckpoints()
        console.log(sucess)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

//PEGAR TODOS OS CHECKPOINTS POR AGÊNCIA *****
route.get("/checkpointss/:agency", async (req: Request, res: Response) => {
    const { agency } = req.params

    try {
        const sucess = await getCheckpointAgency(agency)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }


})


//PEGAR CHECKPOINTS COM FILTRO DE DATA *****
route.post("/checkpointsfilter=:agency", async (req: Request, res: Response) => {
    const { agency } = req.params
    const { filter } = req.body as TFilterCheckpoints

    try {
        const sucess = await getCheckpointAgencyWithFilter(agency, filter)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }


})



//PEGAR O CHECKPOINT DO VIGILANTE DO DIA ATUAL *****
route.get("/checkpoints/currentday/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId

    try {
        const sucess = await findCheckpointByIdByCurrentDate(Number(userId))
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

//PEGAR TODOS OS CHECKPOINTS DO DIA ATUAL *****
route.get("/checkpoints=today", async (req: Request, res: Response) => {
    try {
        const response = await findCheckpointByDay()
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.get("/filtercheckpoints", async (req: Request, res: Response) => {
    const { filter } = req.body as TFilterCheckpoints

    try {
        const sucess = await getCheckpointByIDByDate(filter)
        res.send(sucess)

    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

export default route


type TFilterCheckpoints = {
    filter: {
        day: {
            first: number,
            end: number
        },
        month: {
            first: number,
            end: number
        },
        year: {
            first: number,
            end: number
        }
    }

}