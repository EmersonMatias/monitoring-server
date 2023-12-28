import { Request, Router, Response } from "express"
import { findAllUsers } from "../signup/signup.repository.js"
import { createCheckPoint, createCheckPoints, getAllCheckpoints, getUserCheckpoints, markCheckPoint } from "./vigilants.repository.js"

const route = Router()
export const vigilants = [
    {
        "name": "Emerson Rodrigo dos Santo",
        "hour": "14:20",
        "agency": "Agência Bancária",
        "arrived": true

    },
    {
        "name": "Adriana Jovenato",
        "hour": "11:20",
        "agency": "Agência Correios",
        "arrived": false
    },
    {
        "name": "Marta Maria",
        "hour": "15:20",
        "agency": "Agência Correios",
        "arrived": true
    },
    {
        "name": "Marcos Maria",
        "hour": "18:20",
        "agency": "Agência Correios",
        "arrived": false
    }
]

//Criar todos os checkpoints dos vigilantes
route.post("/createcheckpoints", async (req: Request, res: Response) => {
    const dates = new Date()
    const day = dates.getDate()
    const month = dates.getMonth() + 1
    const year = dates.getFullYear()
    const date = `${day}/${month}/${year}`

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

//Criar apenas checkpoint do vigilante que foi criado apos todos os checkpoints terem sido criados
route.post("/createcheckpoint", async (req: Request, res: Response) => {
    const { userId } = req.body
    const dates = new Date()
    const day = dates.getDate()
    const month = dates.getMonth() + 1
    const year = dates.getFullYear()
    const date = `${day}/${month}/${year}`

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

//Atualizar o checkpoint do dia
route.put("/checkpoint", async (req: Request, res: Response) => {
    const { checkpointId } = req.body
    const currentDate = new Date
    const hour = currentDate.getHours()
    const minutes = currentDate.getMinutes()

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
    

route.get("/vigilants", async (req: Request, res: Response) => {
    const sucess = await findAllUsers()

    return res.status(200).send(sucess)
})

route.get("/checkpoints", async (req: Request, res: Response) => {

    const sucess = await getAllCheckpoints()
    console.log(sucess)

    res.send(sucess)
})


export default route

