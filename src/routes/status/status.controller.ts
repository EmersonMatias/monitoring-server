import { Request, Response } from "express";
import { ParamID } from "../../middlewares/types";
import { handleError } from "../../errors/errors.js";
import { StatusService } from "./status.service.js";

async function findUnique(req: Request & ParamID, res: Response) {
    const id = req.id

    try {
        const sucess = await StatusService.findUnique(id)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function findMany(req: Request, res: Response){

    try{
        const sucess = await StatusService.findMany()
        res.send(sucess)
    }catch(error){
        console.log(error)
        handleError(error, res)
    }
}

async function update(req: Request & ParamID, res: Response) {
    const id = req.id
    const situation = req.body.situation as "OK" | "PANIC"

    try {
        const sucess = await StatusService.update(id, situation)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

export const StatusController = {
    findUnique, update,findMany
}