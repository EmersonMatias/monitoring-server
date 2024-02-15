import { database } from "../../../prisma/index.js";
import { CreateMessage } from "./types.js";

//Criar mensagem
async function create(data: CreateMessage) {
    return await database.messages.create({ data })
}

//Achar mensagens com filtro de data inicial e final
async function findMany({ initialDate, finalDate }: { initialDate?: Date, finalDate?: Date }) {
    return await database.messages.findMany({
        where: {
            dateTime: {
                gte: initialDate,
                lte: finalDate
            }
        },
        select: {
            id: true,
            dateTime: true,
            message: true,
            viewed: true,
            response: true,
            agency: true,
            user: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy:{
            dateTime: "desc"
        }
    })
}

async function update(id: number, response: string) {
    return await database.messages.update({
        where: {
            id
        },
        data: {
            response,
            viewed: true
        }
    })
}


export const MessagesRepository = {
    create, findMany,update
} 