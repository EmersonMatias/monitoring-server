import { Request, Response } from "express";
import { CreateMessage, UpdateMessage } from "./types";
import { handleError } from "../../errors/errors.js";
import { MessagesService } from "./messages.service.js";
import { ParamID, ReqDates } from "../../middlewares/types";

async function create(req: Request, res: Response) {
    const data = req.body as CreateMessage

    try {
        const sucess = await MessagesService.create(data)

        res.status(201).send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }


}

async function findMany(req: Request & ReqDates, res: Response) {
    const initialDate = req.initialDate
    const finalDate = req.finalDate

    try {
        const sucess = await MessagesService.findMany({ initialDate, finalDate })
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function update(req: Request & ParamID, res: Response) {
    const id = req.id
    const { response } = req.body as UpdateMessage

    try {
        const sucess = await MessagesService.update(id, response)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}


export const MessagesController = {
    create, findMany,update
}