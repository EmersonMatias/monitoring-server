import { Request, Response } from "express";
import { handleError } from "../../errors/errors.js";
import { CheckpointsService as CheckpointsS } from "./checkpoints.service.js";
import { CheckpointQueries } from "./type.js";


async function findMany(req: Request & CheckpointQueries, res: Response) {
    const date = req.date

    try {
        const sucess = await CheckpointsS.findMany({ date })
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function create(req: Request, res: Response){
    
} 

export const CheckpointsController = {
    findMany
}