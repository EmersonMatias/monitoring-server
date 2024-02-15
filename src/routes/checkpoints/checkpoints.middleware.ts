import { NextFunction, Request, Response } from "express"
import { ErrorBodyIsEmpty } from "../../errors/errors.js"
import { ReqDate } from "../../middlewares/types.js"
import { dateSchema } from "../../models/usersSchema.js"


async function createCheckpointBody(req: Request & ReqDate, res: Response, next: NextFunction){
    const date = req.body.date as Date

    if(!date) return res.status(ErrorBodyIsEmpty.status).send({ message: ErrorBodyIsEmpty.message })

    const { error } = dateSchema.validate(date, { abortEarly: false })

    if (error) return res.status(400).send(error.details[0].message)

    req.date = new Date(date)

    next()
}


export const CheckpointsMiddleware = {
    createCheckpointBody
}