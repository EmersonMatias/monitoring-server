import { NextFunction, Request, Response } from "express"
import {  ParamID, ReqDate, ReqDates } from "./types"
import { dateSchema } from "../models/usersSchema.js"

function ParamIDValidation(req: Request & ParamID, res: Response, next: NextFunction) {
    const id = Number(req.params.id)|| undefined

    if (!id) return res.status(400).send({ message: "Id precisa ser um valor númerico!" })

    req.id = id
    next()
}

function QueryDateValidation(req: Request & ReqDate, res: Response, next: NextFunction){
    const dateString = req.query.date as string

    if (dateString) {
        const { error } = dateSchema.validate(dateString, { abortEarly: false })

        if (error) return res.status(400).send(error.details[0].message)

        req.date = new Date(dateString)
    }

    next()
}

function QueryDatesValidation(req: Request & ReqDates, res: Response, next: NextFunction){
    const initialDateString = req.query.initialDate as string
    const finalDateString = req.query.finalDate as string

    if (initialDateString && finalDateString) {
        const { error } = dateSchema.validate(initialDateString, { abortEarly: false })
        const { error: error2 } = dateSchema.validate(finalDateString, { abortEarly: false })

        if (error) return res.status(400).send(error.details[0].message)
        if (error2) return res.status(400).send(error2.details[0].message)


        req.initialDate = new Date(initialDateString)
        req.finalDate = new Date(finalDateString)
    }

    next()

}

export const Middlewares = {
    ParamIDValidation,QueryDateValidation,QueryDatesValidation
}