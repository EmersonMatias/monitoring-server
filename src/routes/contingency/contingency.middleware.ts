import { NextFunction, Request, Response } from "express";
import { ErrorBodyIsEmpty } from "../../errors/errors.js";
import { updateContingencyUpdate } from "../../models/contingencySchema.js";
import { UpdateContingencyBody } from "./type.js";

function UpdateContingencyBody(req: Request, res: Response, next: NextFunction){
    const data = req.body as UpdateContingencyBody

    if (!Object.keys(data).length) return res.status(ErrorBodyIsEmpty.status).send({ message: ErrorBodyIsEmpty.message })

    const { error } = updateContingencyUpdate.validate(data, { abortEarly: false })

    if (error) return res.status(400).send(error.details)

    next()
}

export const ContingencyMiddleware = {
    UpdateContingencyBody
}