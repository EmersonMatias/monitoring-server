import { Request, Response } from "express";
import { TSignInData } from "./signin.middlewares.js";
import { signinServices } from "./signin.services.js";

export async function connectUser(req: Request, res: Response) {
    const signinData = req.body as TSignInData

    try {
        const sucess = await signinServices.connectUser(signinData)
        res.send(sucess)

    } catch (error) {
        console.log(error)
        if (error.message) return res.status(400).send(error.message)

        return res.sendStatus(400)
    } 

} 