import { Request, Response, Router } from "express"
import { createCheckPoints, findCheckpointByDay, findCheckpointByIdByCurrentDate, getAllCheckpoints, getCheckpointAgency, getUserCheckpoints, markCheckPoint } from "./checkpoints.repository.js"
import { findAllUsers } from "../signup/signup.repository.js"
import { dateTime } from "../functions.js"

const route = Router()

//CRIA TODOS OS CHECKPOINTS DOS USUÁRIOS *****
route.post("/checkpoints/createall", async (req: Request, res: Response) => {
    const { day, month, year } = dateTime()

    try {
        const checkpointsExist = await findCheckpointByDay()

        if (checkpointsExist) return res.sendStatus(400)

        const allUsers = await findAllUsers()

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
    }catch(error){
        console.log(error)
        res.send(error)
    }

   
})

//PEGAR O CHECKPOINT DO VIGILANTE DO DIA ATUAL *****
route.get("/checkpoints/currentday/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId

    try{
        const sucess = await findCheckpointByIdByCurrentDate(Number(userId))
        res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }
  
})

//PEGAR TODOS OS CHECKPOINTS DO DIA ATUAL *****
route.get("/checkpoints=today", async (req: Request, res: Response) => {
    try{
        const response = await findCheckpointByDay()
        res.send(response)
    }catch(error){
        console.log(error)
        res.send(error)
    }
 
})

export default route