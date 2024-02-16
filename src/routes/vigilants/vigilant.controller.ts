import { Request, Response } from "express"
import { UpdateVigilantBody, VigilantBody } from "./types"
import { VigilantService as VigilantS, VigilantService } from "./vigilant.service.js"
import { handleError } from "../../errors/errors.js"
import { ParamID, ReqDates } from "../../middlewares/types"

async function create(req: Request, res: Response) {
    const data = req.body as VigilantBody
 
    try {
        //Cria o vigilante
        await VigilantS.create(data)

        return res.status(201).send("Vigilante criado com sucesso")
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function update(req: Request & ParamID, res: Response) {
    const data = req.body as UpdateVigilantBody
    const id = req.id

    try {
        const sucess = await VigilantS.update(id, data)
        res.status(200).send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function findMany(req: Request, res: Response) {
    try {
        const sucess = await VigilantS.findMany()
        return res.status(200).send(sucess)
    } catch (error) {
        handleError(error, res)
    }
}

async function findUnique(req: Request & ParamID, res: Response) {
    const id: number = req.id

    try {
        const sucess = await VigilantS.findUnique(id)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

async function findUniqueFilter(req: Request & ParamID & ReqDates, res: Response){
    const id = req.id
    const initialDate = req.initialDate
    const finalDate = req.finalDate

    try{
        const sucess = await VigilantService.findUniqueFilter(id, initialDate,finalDate)
        console.log(sucess)
        res.send(sucess)
    }catch(error){
        console.log(error)
        handleError(error,res)
    }
}

async function deleteUnique(req: Request & ParamID, res: Response) {
    const id: number = req.id

    try {
        await VigilantS.deleteUnique(id)
        console.log("Usuário deletado")
        res.status(200).send("Vigilante deletado com sucesso!")
    } catch (error) {
        console.log(error)
        handleError(error, res)
    }
}

export const VigilantController = {
    create, findMany, findUnique, deleteUnique,update,findUniqueFilter
}
