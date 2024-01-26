import { Request, Response, Router } from "express";
import { MessagesRepository as Messages, createMessage, getMessagesAgency, getMessagesAgencyWithFilter, viewedMessage } from "./messages.repository.js";

const route = Router()

route.post("/criarmensagem", async (req: Request, res: Response) => {
    const { userId, message } = req.body

    try {
        await createMessage({ userId, message })
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

route.get("/messages", async (req: Request, res: Response) => {

    try {
        const sucess = await Messages.findAll()
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

route.get("/messages/:agencyId", async  (req: Request, res: Response) => {
    const {agencyId} = req.params

    try{
        const sucess = await getMessagesAgency(Number(agencyId))
        return res.send(sucess)
    }catch(error){
        console.log(error)
        res.send(error)
    }

  
})

route.post("/messages/:agencyId", async  (req: Request, res: Response) => {
    const {agencyId} = req.params
    const {filter} = req.body as TFilterCheckpoints

    try{
        const sucess = await getMessagesAgencyWithFilter(Number(agencyId), filter)
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