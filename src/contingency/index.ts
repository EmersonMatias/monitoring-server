import { Request, Response, Router } from "express";
import { ContingencyRepository as Contingency, TActivateContingencyData, TCheckpointContingencyData, TCreateContingencyData, TDeactivateContingencyData } from "./contingency.repository.js";


const route = Router()

 
route.post("/contingency/create", async (req: Request, res: Response) => {
    const data = req.body as TCreateContingencyData
    console.log(data)

    try{
        const sucess = await Contingency.create(data)
        res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})

route.post("/contingency/activate", async (req: Request, res: Response) => {
    const data = req.body as TActivateContingencyData

    try{
        const sucess = await Contingency.activate(data)
        res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})

route.post("/contingency/deactivate", async (req: Request, res: Response) => {
    const data = req.body as TDeactivateContingencyData

    try{
        const sucess = await Contingency.deactivate(data)
        res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})

route.post("/contingency/checkpoint", async (req: Request, res: Response) => {
    const data = req.body as TCheckpointContingencyData

    try{
        const sucess = await Contingency.checkpoint(data)
        res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})

route.get("/contingency/getall", async (req: Request, res: Response) => {
    try{
        const sucess = await Contingency.getAll()
        res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})

route.get("/contingency/getbyuserid=:id", async(req: Request, res: Response) => {
    const id = req.params.id

    try{
        const sucess = await Contingency.getByUserID(Number(id))
        res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})
 
export default route