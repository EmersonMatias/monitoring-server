import { Request, Response } from "express";
import { handleError } from "../../errors/errors.js";
import { CheckpointsService as CheckpointsS } from "./checkpoints.service.js";
import { ParamID, ReqDate } from "../../middlewares/types.js";


async function findMany(req: Request & ReqDate, res: Response) {
    const date = req.date

    try {
        const sucess = await CheckpointsS.findMany({ date })
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function create(req: Request & ReqDate & ParamID, res: Response) {
    const date = req.date
    const id = req.id

    try {
        const sucess = await CheckpointsS.create2(id, date)
        res.status(201).send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }

}

async function findUnique(req: Request & ReqDate & ParamID, res: Response) {
    const userId = req.id
    const date = req.date

    try {
        const sucess = await CheckpointsS.findUnique({ userId, date })
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function update(req: Request & ReqDate & ParamID, res: Response) {
    const id = req.id
    const date = req.date

    try {
        const sucess = await CheckpointsS.update(id, date)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

export const CheckpointsController = {
    findMany, create, findUnique, update
}