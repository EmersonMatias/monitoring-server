import { Request, Response } from "express";
import { ParamID } from "../../middlewares/types";
import { UpdateContingencyBody } from "./type";
import { handleError } from "../../errors/errors.js";
import { ContingencyService } from "./contingency.service.js";


async function update(req: Request & ParamID, res: Response) {
    const userId = req.id
    const { active, situation,frequency } = req.body as UpdateContingencyBody

    try {
        const sucess = await ContingencyService.update(userId, situation, active,frequency)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }

}

async function findMany(req: Request, res: Response){

    try{
        const sucess = await ContingencyService.findMany()
        res.send(sucess)
    }catch(error){
        console.log(error)
        handleError(error,res)
    }
}


async function findUnique(req: Request & ParamID, res: Response){
    const userId = req.id

    try{
        const sucess = await ContingencyService.findUnique(userId)
        res.send(sucess)
    }catch(error){
        console.log(error)
        handleError(error,res)
    }

}

export const ContingencyController = {
    update,findMany,findUnique
}