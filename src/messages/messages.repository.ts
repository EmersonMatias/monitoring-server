import { database } from "../../prisma/index.js";
import { dateTime } from "../functions.js";

type TMessageData = {
    message: string,
    userId: number
}

//CRIAR UMA MENSAGEM NOVA *****
export async function createMessage({ message, userId }: TMessageData) {
    const { day, month, year, hour, minute } = dateTime()


    return await database.messages.create({
        data: {
            userId,
            message,
            day: Number(day),
            month: Number(month),
            year: Number(year),
            hour: `${hour}:${minute}`
        }
    })
}

//ATUALIZAR MENSAGEM COMO VISTA *****
export async function viewedMessage({ response, messageId }: { response: string, messageId: number }) {

    return await database.messages.update({
        where: {
            id: messageId
        }, data: {
            viewed: true,
            response
        }
    })
}

//PEGAR TODAS AS MENSAGENS *****
export async function findAllMensagens() {
    return await database.messages.findMany({
        select: {
            id: true,
            day: true,
            month: true,
            year: true,
            hour: true,
            message: true,
            response: true,
            viewed: true,
            user: {
                select: {
                    name: true,
                    agency: true
                }
            }
        }
    })
}

//PEGAR MENSAGENS POR AGÊNCIA ******
export async function getMessagesAgency(agency: string) {
    return await database.messages.findMany({
        where: {
            user: {
                agency
            }
        },
        include: {
            user: {
                select: {
                    name: true,
                    entryTime: true,
                    departureTime: true
                }
            }
        }
    })
}