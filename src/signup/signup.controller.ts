import { Request, Response } from "express";
import { SignUp } from "./signup.types";
import { signupServices } from "./signup.services.js";
import { createCheckPoint } from "../checkpoints/checkpoints.repository.js";


export async function registerVigilant(req: Request, res: Response) {
    const signupData = req.body as SignUp


    try {
        const sucess = await signupServices.registerVigilant(signupData)

        const dates = new Date()
        const day = dates.getDate()
        const month = dates.getMonth() + 1
        const year = dates.getFullYear()
        const date = `${day}/${month}/${year}`

        const checkpointData = {
            userId: sucess.id, 
            date
        }
        const response = await createCheckPoint(checkpointData)

        return res.status(201).send({ userId: sucess.id })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}


