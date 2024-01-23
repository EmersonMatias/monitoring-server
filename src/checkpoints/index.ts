import { Request, Response, Router } from "express"
import { CheckpointsRepository as Checkpoints} from "./checkpoints.repository.js"
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

        const isHoliday = (eFeriado !== undefined) || (dayOfWeek === "domingo") || (dayOfWeek === "sabado")

        return isHoliday
    }

    console.log(todayIsHoliday())
})
 
const todayIsHoliday = () => {
    const { day, month, year, dayOfWeek } = dateTime()
    const feriados = vacation()
    const today = `${day}/${month}/${year}`

    const eFeriado = feriados.find((dia) => dia.date === today)
 

    const isHoliday = (eFeriado !== undefined) || (dayOfWeek === "domingo") || (dayOfWeek === "sabado")

    return isHoliday
}

//CRIA TODOS OS CHECKPOINTS DOS USUÁRIOS *****
route.post("/checkpoints/createall", async (req: Request, res: Response) => {
    const { day, month, year, dayOfWeek } = dateTime()

    try {
        const checkpointsExist = await Checkpoints.findAllCheckpointsOfTheDay()

        if (checkpointsExist.length !== 0) return res.sendStatus(400)

        const allUsers = await findAllUsers()
 
        console.log(dayOfWeek)
        
        if (!todayIsHoliday() && dayOfWeek !== "sabado" && dayOfWeek !== "domingo") {
            const checkpointData = allUsers.map((user) => {
                return {
                    userId: user.id,
                    day: Number(day),
                    month: Number(month),
                    year: Number(year)
                }
            })

            await Checkpoints.createAll(checkpointData)

            res.status(200).send("Checkpoints Created")
        } else if (dayOfWeek === "sabado") {
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
            await Checkpoints.createAll(checkpointSaturday)

            res.status(200).send("Checkpoints Created")
        } else if (dayOfWeek === "domingo") {
            const checkpointData = allUsers.filter((user) =>  user.sunday === true )
            const checkpointSunday = checkpointData.map((user) => {
                return {
                    userId: user.id,
                    day: Number(day),
                    month: Number(month),
                    year: Number(year)
                }
            })

            await Checkpoints.createAll(checkpointSunday)

            res.status(200).send("Checkpoints Created")
        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//CRIAR CHECKPOINT DO USUÁRIO****
route.post("/checkpoint/create", async (req: Request, res: Response) => {
    const checkpointData = req.body as { day: number, month: number, year: number, userId: number }
    const { id } = req.params

    const checkpointDateFormated = {
        userId: Number(checkpointData.userId),
        day: Number(checkpointData.day),
        month: Number(checkpointData.month),
        year: Number(checkpointData.year)
    }


    try {
        const sucess = await Checkpoints.create(checkpointDateFormated)
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
        const sucess = await Checkpoints.updateCheckpoint(markCheckPointData)
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
        const sucess = await Checkpoints.findAllCheckpointsByUserId(Number(userId))
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
        const sucess = await Checkpoints.findAll()
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
        const sucess = await Checkpoints.findAllCheckpointsByAgency(agency)
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
        const sucess = await Checkpoints.findAllCheckpointsByAgencyByDate(agency, filter)
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
        const sucess = await Checkpoints.findAllCheckpointsOfTheDayByUserId(Number(userId))
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

//PEGAR TODOS OS CHECKPOINTS DO DIA ATUAL *****
route.get("/checkpoints=today", async (req: Request, res: Response) => {
    try {
        const response = await Checkpoints.findAllCheckpointsOfTheDay()
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.get("/filtercheckpoints", async (req: Request, res: Response) => {
    const { filter } = req.body as TFilterCheckpoints

    try {
        const sucess = await Checkpoints.findAllCheckpointsByDate(filter)
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