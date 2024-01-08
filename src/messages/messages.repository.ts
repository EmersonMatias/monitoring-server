import { database } from "../../prisma/index.js";


type TMessage = {
    message: string,
    userId: number
}

export async function createMessage({ message, userId }: TMessage) {
    const currentDate = new Date
    const hours = currentDate.getHours().toString().padStart(2,"0")
    const minutes = currentDate.getMinutes().toString().padStart(2,"0")

    return await database.messages.create({
        data: {
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


export async function findAllMensagens(){
    return await database.messages.findMany({
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

export async function getMessagesAgency(agency: string){
    return await database.messages.findMany({
        where:{
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