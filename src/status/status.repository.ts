import { database } from "../../prisma/index.js";
import { dateTime } from "../functions.js";


type TStatusData = {
    userId?: number
    hour: number
    minute: number
    status?: string
}

//CRIA STATUS DO VIGILANTE *****
export async function createStatus(statusData: TStatusData, frequency: number) {
    const status = "OK"
    const { userId, hour, minute } = statusData

    return await database.status.create({
        data: {
            status,
            userId,
            hour,
            minute,
            frequency
        }
    })
}

//PEGAR TODOS OS STATUS *****
export async function findAllStatus() {
    return await database.status.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    entryTime: true,
                    departureTime: true,
                    agency: true
                }
            }
        }
    })
}

//PEGAR TODOS OS STATUS DO USUARIO ******
export async function findStatusById(userId: number) {
    return await database.status.findMany({
        where: {
            userId
        }
    })
}

//ATUALIZAR STATUS PELO ID *****
export async function updateById(id: number, status: string) {
    const {hour, minute} = dateTime()

    return await database.status.update({
        where: {
            id
        }, data: {
            status,
            hour: Number(hour),
            minute: Number(minute)
        }
    })
}

export async function updateByUserId(userId: string, frequency: number){
    return await database.status.updateMany({
        where:{
            userId: Number(userId)
        }, 
         data: {
            frequency
         }
    })
}

//DELETAR UM STATUS *****
export async function deleteStatus(userId: number) {
    return await database.status.deleteMany({
        where: {
            userId
        }
    })
}

