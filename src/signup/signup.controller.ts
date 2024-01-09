import { Request, Response } from "express";
import { SignUp } from "./signup.types";
import { signupServices } from "./signup.services.js";
import { createCheckPoint } from "../checkpoints/checkpoints.repository.js";
import { createStatus } from "../status/status.repository.js";
import { dateTime } from "../functions.js";


export async function registerVigilant(req: Request, res: Response) {
    const signupData = req.body as SignUp
    const { day, month, year, hour, minute } = dateTime()

    try {

        //REGISTRA VIGILANTE
        const sucess = await signupServices.registerVigilant(signupData)

        const checkpointData = {
            userId: sucess.id,
            day: Number(day),
            month: Number(month),
            year: Number(year)
        }

        //CRIA CHECKPOINT DO VIGILANTE
        await createCheckPoint(checkpointData)

        const statusData = {
            userId: sucess.id,
            hour: Number(hour),
            minute: Number(minute),
        }

        //CRIA STATUS DO VIGILANTE
        await createStatus(statusData, signupData.frequency)

        return res.status(201).send({ userId: sucess.id })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}


