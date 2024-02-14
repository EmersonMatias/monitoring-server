import { NextFunction, Request, Response } from "express"
import {  ParamID, QueryDate } from "./types"
import { dateSchema } from "../models/usersSchema.js"

function ParamIDValidation(req: Request & ParamID, res: Response, next: NextFunction) {
    const id = Number(req.params.id)|| undefined

    if (!id) return res.status(400).send({ message: "Id precisa ser um valor númerico!" })

    req.id = id
    next()
}

function QueryDateValidation(req: Request & QueryDate, res: Response, next: NextFunction){
    const dateString = req.query.date as string

    if (dateString) {
        const { error } = dateSchema.validate(dateString, { abortEarly: false })

        if (error) return res.status(400).send(error.details[0].message)

        req.date = new Date(dateString)
    }

    next()
}

function BodyDateValidation(req: Request, res: Response, next: NextFunction){
    const date = req.body.date

    
}

export const Middlewares = {
    ParamIDValidation,QueryDateValidation
}