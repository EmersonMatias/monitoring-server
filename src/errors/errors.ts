import { Response } from "express";

export const ErrorStringIsInvalid = {
    message: "String is invalid",
    status: 400
}

export const ErrorBodyIsEmpty = {
    message: "O corpo da requisição está vazio. Preencha os dados necessários!",
    status: 400
}

export const ErrorUserAlredyExist = {
    message: "O usuário já existe!",
    status: 409
}

export const ErrorAgencyAlredyExist = {
    message: "A agência já existe, tente outro nome!",
    status: 409
}

export const ErrorVigilantDoesntExist = {
    message: "Vigilante não existe!",
    status: 404
}

export class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        // Garantindo que a classe estende corretamente uma classe interna do JavaScript
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export function handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
        res.status(error.status).send({ message: error.message });
    } else {
        res.status(500).send({message: `${error}`});
    }
}
