import { database } from "../../prisma/index.js"
import { todaysDate } from "../functions.js"

type TCheckpointData = {
    userId: number
    date: string
}

type TMarkCheckPointData = {
    checkpointId: number
    arrived: boolean
    arrivalTime: string
}

//Criar todos os checkpoints dos usuários
export async function createCheckPoints(checkpointData: TCheckpointData[]) {

    return await database.checkpoint.createMany({
        data: checkpointData
    })
}

//Criar apenas o checkpoint de um usuário
export async function createCheckPoint(checkpointData: TCheckpointData) {
    return await database.checkpoint.create({
        data: checkpointData
    })
}

//Marcar o checkpoint
export async function markCheckPoint(markCheckPointData: TMarkCheckPointData) {
    const { arrivalTime, arrived, checkpointId } = markCheckPointData

    return await database.checkpoint.update({
        where: {
            id: checkpointId
        },
        data: {
            arrivalTime,
            arrived
        }
    })
}

//Pegar o checkpoint do usuário
export async function getUserCheckpoints(userId: number) {

    return await database.checkpoint.findMany({
        where: {
            userId
        }
    })
}

//Pegar o checkpoint do usuário pelo dia atual
export async function findCheckpointByIdByCurrentDate(userId: number) {
    const { day, year, month } = todaysDate()
    const currentDate = `${day}/${month}/${year}`

    return await database.checkpoint.findFirst({
        where:{
            userId,
            date: currentDate
        }
    })

}

export async function findCheckpointdByCurrentDate() {
    const { day, year, month } = todaysDate()
    const currentDate = `${day}/${month}/${year}`

    return await database.checkpoint.findFirst({
        where:{
            date: currentDate
        }
    })

}

//Pegar todos os checkpoints
export async function getAllCheckpoints() {

    return await database.checkpoint.findMany({
        select: {
            arrived: true,
            arrivalTime: true,
            date: true,
            user: {
                select: {
                    name: true,
                    agency: true,
                    entryTime: true
                }
            }
        }
    })
}

//Excluir um checkpoint
export async function deleteCheckpoints(id: number) {
    return await database.checkpoint.deleteMany({
        where: {
            userId: id
        }
    })
}

export async function getCheckpointAgency(agency: string) {
    return await database.checkpoint.findMany({
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