import { Request, Response, Router } from "express";
import { createMessage, findAllMensagens, getMessagesAgency, viewedMessage } from "./messages.repository.js";

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

    const sucess = await getMessagesAgency(agency)
    return res.send(sucess)
})


export default route