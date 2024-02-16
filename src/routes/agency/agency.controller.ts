import { Request, Response } from "express";
import { AgencyService as AgencyS } from "./agency.service.js";
import { AgencyBody } from "./type";
import { handleError } from "../../errors/errors.js";
import { ParamID, ReqDates } from "../../middlewares/types.js";

async function create(req: Request, res: Response) {
    const { name } = req.body as AgencyBody

    try {
        await AgencyS.create(name)
        res.status(201).send("Agência criada com sucesso!")
    } catch (error) {
        handleError(error, res)
    }
}

async function findMany(req: Request, res: Response) {

    try {
        const sucess = await AgencyS.findMany()
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function findUniqueFilter(req: Request & ParamID & ReqDates, res: Response) {
    const id = req.id
    const initialDate = req.initialDate
    const finalDate = req.finalDate

    try {
        const sucess = await AgencyS.findUniqueFilter(id, initialDate, finalDate)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}


export const AgencyController = {
    create, findMany,findUniqueFilter
}