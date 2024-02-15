import { NextFunction, Request, Response } from "express";
import { CreateMessage, UpdateMessage } from "./types";
import { ErrorBodyIsEmpty } from "../../errors/errors.js";
import { createMessageSchema, updateMessageSchema } from "../../models/messagesSchema.js";

function CreateMessageBody(req: Request, res: Response, next: NextFunction) {
    const data = req.body as CreateMessage

    //Verifica se o objeto está vazio
    if (!Object.keys(data).length) return res.status(ErrorBodyIsEmpty.status).send({ message: ErrorBodyIsEmpty.message })

    //Valida se os dados estão corretos
    const { error } = createMessageSchema.validate(data, { abortEarly: false })

    if (error) return res.status(400).send(error.details)

    next()
}

function UpdateMessageBody(req: Request, res: Response, next: NextFunction) {
    const data = req.body as UpdateMessage
    console.log(data)

    //Verifica se o objeto está vazio
    if (!Object.keys(data).length) return res.status(ErrorBodyIsEmpty.status).send({ message: ErrorBodyIsEmpty.message })


    //Valida se os dados estão corretos
    const { error } = updateMessageSchema.validate(data, { abortEarly: false })

    if (error) return res.status(400).send(error.details)

    next()

}




export const MessagesMiddlewares = {
    CreateMessageBody,UpdateMessageBody
}