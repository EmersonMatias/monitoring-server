import { NextFunction, Request, Response } from "express"
import {  UpdateVigilantBody, VigilantBody } from "./types.js"
import { signupVigilantSchema, updateVigilantScema } from "../../models/usersSchema.js"
import { ErrorBodyIsEmpty } from "../../errors/errors.js"

function createVigilantBody(req: Request, res: Response, next: NextFunction) {
    const data = req.body as VigilantBody

    //Verifica se o corpo está vazio
    if (!Object.keys(data).length) return res.status(ErrorBodyIsEmpty.status).send({ message: ErrorBodyIsEmpty.message })

    //Valida os dados
    const { error } = signupVigilantSchema.validate(data, { abortEarly: false })

    if (error) return res.status(400).send(error.details)

    next()
}

function updateVigilantBody(req: Request, res: Response, next: NextFunction) {
    const data = req.body as UpdateVigilantBody

    console.log(data)

    //Verifica se o corpo está vazio
    if (!Object.keys(data).length) return res.status(ErrorBodyIsEmpty.status).send({ message: ErrorBodyIsEmpty.message })

    //Valida os dados
    const { error } = updateVigilantScema.validate(data, { abortEarly: false })

    if (error) return res.status(400).send(error.details)

    next()
}

export const VigilantMiddleware = {
    createVigilantBody,updateVigilantBody
}

