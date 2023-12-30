import { database } from "../../prisma/index.js";
import { currentTime, todaysDate } from "../functions.js";


type TMessage = {
    message: string,
    userId: number
}

export async function createMessage({ message, userId }: TMessage) {
    const { day, month, year } = todaysDate()
    const { hours, minutes } = currentTime()

    return await database.messages.create({
        data: {
            date: `${day}/${month}/${year}`,
            hour: `${hours}:${minutes}`,
            userId,
            message
        }
    })
}
 
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


export async function findAllMensagens() {
    return await database.messages.findMany({})
}
