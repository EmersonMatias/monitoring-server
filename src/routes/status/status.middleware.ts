import { NextFunction, Request, Response } from "express";
import { ErrorBodyIsEmpty } from "../../errors/errors.js";
import { updateStatusSchema } from "../../models/statusSchema.js";

function UpdateBodyValidate(req: Request, res: Response, next: NextFunction){
    const data = req.body

    if (!data) return res.status(ErrorBodyIsEmpty.status).send({ message: ErrorBodyIsEmpty.message })

    const { error } = updateStatusSchema.validate(data, { abortEarly: false })

    if (error) return res.status(400).send(error.details[0].message)

    next()
}







export const StatusMiddleware = {
    UpdateBodyValidate
}