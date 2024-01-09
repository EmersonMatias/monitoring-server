import { Request, Response, Router } from "express";
import { createMessage, findAllMensagens, getMessagesAgency, getMessagesAgencyWithFilter, viewedMessage } from "./messages.repository.js";

const route = Router()

route.post("/criarmensagem", async (req: Request, res: Response) => {
    const { userId, message } = req.body

    try {
        const sucess = await createMessage({ userId, message })
        res.status(201).send("Mensagem criada")
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.put("/visualizarmensagem", async (req: Request, res: Response) => {
    const { response, messageId } = req.body
    const viewdData = {
        response,
        messageId: Number(messageId)
    }

    try{
        const sucess = await viewedMessage(viewdData)
        console.log(sucess)
        res.sendStatus(200)
    }catch(error){
        console.log(error)
        res.send(error)
    }
})

route.get("/mensagens", async (req: Request, res: Response) => {

    try {
        const sucess = await findAllMensagens()
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

route.get("/messages/:agency", async  (req: Request, res: Response) => {
    const {agency} = req.params

    try{
        const sucess = await getMessagesAgency(agency)
        return res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }

  
})

route.post("/messages/:agency", async  (req: Request, res: Response) => {
    const {agency} = req.params
    const {filter} = req.body as TFilterCheckpoints

    try{
        const sucess = await getMessagesAgencyWithFilter(agency, filter)
        return res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }

  
})

type TFilterCheckpoints = {
    filter: {
        day: {
            first: number,
            end: number
        },
        month: {
            first: number,
            end: number
        },
        year: {
            first: number,
            end: number
        }
    }

}


export default route