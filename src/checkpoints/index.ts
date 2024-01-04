import {Request, Response, Router} from "express"
import { createCheckPoint, createCheckPoints, getAllCheckpoints, getUserCheckpoints, markCheckPoint } from "./checkpoints.repository.js"
import { findAllUsers } from "../signup/signup.repository.js"

const route = Router()

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
 


export default route