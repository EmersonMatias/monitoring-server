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

//PEGAR MENSAGENS POR AGÊNCIA ******
export async function getMessagesAgency(agencyId: number) {
    return await database.messages.findMany({
        where: {
            user: {
                agencyId
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

//PEGAR MENSAGENS POR AGÊNCIA E POR FILTRO DE DATA******
export async function getMessagesAgencyWithFilter(agencyId: number,filter: TFilterCheckpoints) {
    const { day, month, year } = filter


    return await database.messages.findMany({
        where: {
            user: {
                agencyId
            },
            day: {
                gte: Number(day.first),
                lte: Number(day.end)
            },
            month: {
                gte: Number(month.first),
                lte: Number(month.end)
            },
            year: {
                gte: Number(year.first),
                lte: Number(year.end)
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

type TFilterCheckpoints = {
    day: {
        first: number,
        end: number
    },
    month: {
        first: number,
        end: number
    },
    year: {
        first: number,
        end: number
    }
}

async function findAll() {
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

export const MessagesRepository = {
    findAll
}
