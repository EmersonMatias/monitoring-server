import { Request, Router, Response } from "express"
import { findAllUsers } from "../signup/signup.repository.js"
import { deleteMessages, deleteVigilant, getAgencies, vigilantComplete } from "./vigilants.repository.js"
import { deleteCheckpoints } from "../checkpoints/checkpoints.repository.js"
import { deleteStatus } from "../status/status.repository.js"

const route = Router()

route.get("/vigilants", async (req: Request, res: Response) => {
    const sucess = await findAllUsers()

    return res.status(200).send(sucess)
})

route.delete("/vigilants/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = Number(id)

    if (isNaN(userId)) return (
        res.status(400).send("String is invalid!")
    )

    const sucessM = await deleteMessages(userId)
    const sucessC = await deleteCheckpoints(userId)
    const sucessS = await deleteStatus(userId)
    const sucess = await deleteVigilant(userId)
    console.log(sucess)
    res.send(sucess)
})

route.get("/vigilants/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = Number(id)

    if (isNaN(userId)) return (
        res.status(400).send("String is invalid!")
    )

    const sucess = await vigilantComplete(userId)
    res.send(sucess)

})

route.get("/agency/:agency", async (req: Request, res: Response) => {
    const { agency } = req.params

    const sucess = await getAgencies(agency)
    res.send(sucess)
})

export default route

