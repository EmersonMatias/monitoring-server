import { NextFunction, Request, Response } from "express";
import { signupVigilantSchema } from "../models/usersSchema.js";
import { SignUp } from "./signup.types.js";

 
export function validateSignUpData(req: Request, res: Response, next: NextFunction){
    const signupData = req.body as SignUp

    console.log(signupData)

    if(!Object.keys(signupData).length) return res.sendStatus(400)

    const {error} = signupVigilantSchema.validate(signupData, {abortEarly: false})

    if(error) return res.status(400).send(error.details)

    next()
} 