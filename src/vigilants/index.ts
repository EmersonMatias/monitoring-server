import { Request, Router, Response } from "express"
import { findAllUsers } from "../signup/signup.repository.js"
import { deleteMessages, deleteVigilant } from "./vigilants.repository.js"
import { deleteCheckpoints, getAllCheckpoints } from "../checkpoints/checkpoints.repository.js"

const route = Router()

route.get("/vigilants", async (req: Request, res: Response) => {
    const sucess = await findAllUsers()

    return res.status(200).send(sucess)
})

route.delete("/vigilants/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = Number(id)

    if(isNaN(userId)) return(
        res.status(400).send("String is invalid!")
    )

    const sucessM = await deleteMessages(userId)
    const sucessC = await deleteCheckpoints(userId)
    const sucess = await deleteVigilant(userId)
        console.log(sucess)
    res.send(sucess)
}) 
 
export default route

