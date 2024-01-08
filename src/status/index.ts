import { Request, Response, Router } from "express";
import { findAllStatus, findStatusById, updateById } from "./status.repository.js";

const route = Router()

route.get("/status/findbyid=:id", async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)

    try {
        const sucess = await findStatusById(Number(id))
        res.send(sucess[0])
    } catch (error) {
        console.log(error)
    }
})

//PEGA TODOS OS STATUS
route.get("/status/getall", async (req: Request, res: Response) => {

    try {
        const sucess = await findAllStatus()
        res.send(sucess)
    } catch (error) {
        console.log(error)
    }
})

route.post("/status/updatebyid=:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const { newStatus } = req.body
    console.log(id, newStatus)

    try {
        const sucess = await updateById(Number(id), newStatus)
        res.send(sucess)
    }catch(error){
        console.log(error)
    }
})




export default route