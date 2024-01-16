import { Request, Router, Response } from "express";
import { AlertRepository } from "./alert.repository.js";


const route = Router()


route.post("/alert/create", async (req: Request, res: Response) => {
    const { name } = req.body

    try {
        const sucess = await AlertRepository.create(name)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.get("/alert/findall", async (req: Request, res: Response) => {

    try {
        const sucess = await AlertRepository.findAll()
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.post("/alert/update=:id", async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const sucess = await AlertRepository.update(Number(id))
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})



export default route