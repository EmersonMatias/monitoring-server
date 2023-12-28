import { Request, Response } from "express";
import { SignUp } from "./signup.types";
import { signupServices } from "./signup.services.js";


export async function registerVigilant(req: Request, res: Response){
    const signupData = req.body as SignUp


    try{
        const sucess = await signupServices.registerVigilant(signupData)
        console.log(sucess)
        return res.status(201).send({userId: sucess.id})
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
     
}


