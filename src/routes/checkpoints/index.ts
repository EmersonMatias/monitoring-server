import { Request, Response, Router } from "express"
import { CheckpointsController as Controller } from "./checkpoints.controller.js"
import { Middlewares } from "../../middlewares/index.js"
import { CheckpointsRepository } from "./checkpoints.repository.js"
import { convertDateToBrasilia } from "../../functions.js"

const route = Router()

route.get("/checkpoints", Middlewares.QueryDateValidation, Controller.findMany)
 
route.post("/checkpoints", async (req: Request, res: Response) => {
    const body = req.body
    const date = new Date()
 
    const data = {...body, date}
    const sucess = await CheckpointsRepository.createT(data)

    console.log(sucess)

    res.send("OK")
})

route.get('/checkpoint', async (req: Request, res: Response) => {
  
    const sucess = await CheckpointsRepository.findManyT()
    console.log(sucess[4]?.arrivalTime?.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }))

    console.log(convertDateToBrasilia(sucess[0].date))


    res.send(sucess)
} )

route.post("/mark", async (req: Request, res: Response) => {
    const date = new Date()

    const sucess = await CheckpointsRepository.updateT(7,date)

    res.send(sucess)
} )


route.post("/checkpoints/:id", Middlewares.ParamIDValidation )




export default route
