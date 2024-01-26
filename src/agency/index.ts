import { Request, Router, Response } from "express";
import { AgencyRepository as Agency } from "./agency.repository.js";


const router = Router()

router.get("/agency", async (req: Request, res: Response) => {
    try {
        const sucess = await Agency.findAll()
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

router.get("/agency/:id", async (req: Request, res: Response) => {
    const { id } = req.params
 
    try {
        const sucess = await Agency.findOne(Number(id))
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
 
})

router.post("/agency", async (req: Request, res: Response) => {
    const { name } = req.body as TAgencyData

    try {
        const sucess = await Agency.create(name)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

  
router.delete("/agency/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    console.log(id)

    try {
        const sucess = await Agency.deleteOne(Number(id))
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})
 

type TAgencyData = {
    name: string
}








export default router