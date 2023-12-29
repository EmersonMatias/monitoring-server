import { database } from "../../prisma/index.js";
import { currentTime, todaysDate } from "../functions.js";


type TMessage = {
    message: string,
    userId: number
}

export async function createMessage({ message, userId }: TMessage) {
    const { day, month, year } = todaysDate()
    const { hours, minutes } = currentTime()


    return await database.alertmessages.create({
        data: {
            date: `${day}/${month}/${year}`,
            hour: `${hours}:${minutes}`,
            userId,
            message
        }
    })
}

export async function viewedMessage({ response, messageId }: { response: string, messageId: number }) {

    return await database.alertmessages.update({
        where: {
            id: messageId
        }, data: {
            viewed: true,
            response
        }
    })
}


export async function findAllMensagens() {

    return await database.alertmessages.findMany({
        select: {
            id: true,
            date: true,
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
