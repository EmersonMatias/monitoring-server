import { Request, Response } from "express";
import { SignUp } from "./signup.types";
import { createNewUser } from "./signup.repository.js";


export async function registerVigilant(req: Request, res: Response){
    const signupData = req.body as SignUp


    const sucess = await createNewUser(signupData)

    console.log("Conta criada")
    res.send("OK")

}