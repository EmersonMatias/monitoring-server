import { database } from "../../prisma/index.js";

type TCheckpointData = {
    userId: number
    date: string
}

type TMarkCheckPointData = {
    checkpointId: number
    arrived: boolean
    arrivalTime: string
}

export async function createCheckPoint(checkpointData: TCheckpointData) {
    const { date, userId } = checkpointData

    return await database.checkpoint.create({
        data: {
            userId,
            date
        }
    })
}

export async function markCheckPoint(markCheckPointData: TMarkCheckPointData) {
    const {arrivalTime, arrived, checkpointId } = markCheckPointData

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

export async function getUserCheckpoints(userId: number){

    return await database.checkpoint.findMany({
        where:{
            userId
        }
    })
}