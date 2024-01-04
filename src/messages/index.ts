import { Request, Response, Router } from "express";
import { createMessage, findAllMensagens, viewedMessage } from "./messages.repository.js";

const route = Router()

route.post("/criarmensagem", async (req: Request, res: Response) => {
    const { userId, message } = req.body
    console.log(userId, message)

    try {
        const sucess = await createMessage({ userId, message })
        res.sendStatus(201)
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


export default route