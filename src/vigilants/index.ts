import { Request, Router, Response } from "express"
import { findAllUsers } from "../signup/signup.repository.js"
import { createCheckPoint, getUserCheckpoints, markCheckPoint } from "./vigilants.repository.js"

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


route.post("/checkpoint", async (req: Request, res: Response) => {
    const dates = new Date()
    const day = dates.getDate()
    const month = dates.getMonth() + 1
    const year = dates.getFullYear()
    const date = `${day}/${month}/${year}`
    const userId = 1
    const checkpointData = {
        date: "23/12/2023",
        userId
    }

    const sucess = await createCheckPoint(checkpointData)
    console.log(sucess)
    res.sendStatus(200)

})

route.put("/checkpoint", async (req: Request, res: Response) => {
    const currentDate = new Date
    const hour = currentDate.getHours()
    const minutes = currentDate.getMinutes()

    const markCheckPointData = {
        checkpointId: 6,
        arrived: true,
        arrivalTime: `${hour}:${minutes}`
    }
 
    const sucess = await markCheckPoint(markCheckPointData)
    console.log(sucess)
    res.sendStatus(200)
})

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


export default route

