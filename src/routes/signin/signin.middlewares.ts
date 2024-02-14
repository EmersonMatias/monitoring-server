import { NextFunction, Request, Response } from "express"
import { signinVigilantSchema } from "../../models/usersSchema.js"

export type TSignInData = {
    login: string,
    password: string
} 

export function validateSigninData(req: Request, res: Response, next: NextFunction) {
    const signinData = req.body as TSignInData
    console.log(signinData)

    if (!Object.keys(signinData).length) return res.sendStatus(400)

    const { error } = signinVigilantSchema.validate(signinData, { abortEarly: false })

    if (error) throw res.status(400).send(error.details)

    next()
}