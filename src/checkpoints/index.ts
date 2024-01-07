import { Request, Response, Router } from "express"
import {createCheckPoints, findCheckpointByDay, findCheckpointByIdByCurrentDate, findCheckpointdByCurrentDate, getAllCheckpoints, getCheckpointAgency, getUserCheckpoints, markCheckPoint } from "./checkpoints.repository.js"
import { findAllUsers } from "../signup/signup.repository.js"
import { todaysDate } from "../functions.js"

const route = Router()

//Criar todos os checkpoints dos vigilantes
route.post("/createcheckpoints", async (req: Request, res: Response) => {
    const { day, monthc,year} = todaysDate()
    const date = `${day}/${monthc}/${year}`

    const checkpointsExist = await findCheckpointdByCurrentDate()

    if (checkpointsExist) return res.sendStatus(400)

    const allUsers = await findAllUsers()
    const checkpointData = allUsers.map((user) => {
        return {
            userId: user.id,
            date
        }
    })

    try {
        await createCheckPoints(checkpointData)
        res.status(200).send("Checkpoints Created")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

/*

//Criar apenas checkpoint do vigilante que foi criado apos todos os checkpoints terem sido criados
route.post("/createcheckpoint", async (req: Request, res: Response) => {
    const { userId } = req.body
    const { day, monthc, year } = todaysDate()
    const date = `${day}/${monthc}/${year}`
    console.log(day, monthc, year)

    const checkpointData = {
        userId,
        date
    }

    try {
        await createCheckPoint(checkpointData)
        res.status(200).send("Checkpoint Created")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

*/


//Atualizar o checkpoint do dia
route.put("/checkpoint", async (req: Request, res: Response) => {
    const { checkpointId } = req.body
    const currentDate = new Date
    const hour = currentDate.getHours().toString().padStart(2, "0")
    const minutes = currentDate.getMinutes().toString().padStart(2, "0")


    const markCheckPointData = {
        checkpointId,
        arrived: true,
        arrivalTime: `${hour}:${minutes}`
    }

    const sucess = await markCheckPoint(markCheckPointData)

    res.sendStatus(200)
})

//Pegar os checkpoints do vigilante
route.get("/checkpoints/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId

    const sucess = await getUserCheckpoints(Number(userId))
    console.log(sucess)
    res.send(sucess)
})

//Pegar todos os checkpoints
route.get("/checkpoints", async (req: Request, res: Response) => {

    const sucess = await getAllCheckpoints()
    console.log(sucess)

    res.send(sucess)
})

//Pegar os checkpoints por agência
route.get("/checkpointss/:agency", async (req: Request, res: Response) => {
    const { agency } = req.params


    const sucess = await getCheckpointAgency(agency)
    res.send(sucess)
})

//Pegar o checkpoint do usuario do dia atual
route.get("/checkpoints/currentday/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId

    const sucess = await findCheckpointByIdByCurrentDate(Number(userId))
    res.send(sucess)
})

//PEGAR TODOS OS CHECKPOINTS DO DIA ATUAL
route.get("/checkpoints=today", async (req: Request, res: Response) => {
    const response = await findCheckpointByDay()
    res.send(response)
})



export default route