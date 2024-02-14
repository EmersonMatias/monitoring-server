import { NextFunction, Request, Response } from "express";
import { AgencyBody } from "./type";
import { ErrorBodyIsEmpty, ErrorStringIsInvalid } from "../../errors/errors.js";

async function createAgencyBody(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body as AgencyBody

    //Verifica de o corpo está vazio
    if (!name) return res.status(ErrorBodyIsEmpty.status).send({ message: ErrorBodyIsEmpty.message })

    if (typeof (name) !== "string") return res.status(ErrorStringIsInvalid.status).send({ message: ErrorStringIsInvalid.message })

    next()
}




export const AgencyMiddleware = {
    createAgencyBody
}