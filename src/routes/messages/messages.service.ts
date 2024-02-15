import { VigilantService } from "../vigilants/vigilant.service.js";
import { MessagesRepository } from "./messages.repository.js";
import { CreateMessage } from "./types";

async function create(data: CreateMessage) {
    // Verifica se o vigilante existe
    await VigilantService.findUnique(data.userId)

    //Cria mensagem
    return await MessagesRepository.create(data)
}

async function findMany({ initialDate, finalDate }: { initialDate?: Date, finalDate?: Date }) {

    return await MessagesRepository.findMany({ initialDate, finalDate })
}

async function update(id: number, response: string) {

    return await MessagesRepository.update(id, response)
}



export const MessagesService = {
    create, findMany, update
}