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
 
export async function createCheckPoints(checkpointData: TCheckpointData[]) {

    return await database.checkpoint.createMany({
        data: checkpointData
    })
}

export async function createCheckPoint(checkpointData: TCheckpointData) {
    return await database.checkpoint.create({
        data: checkpointData
    })
}

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

export async function getUserCheckpoints(userId: number) {

    return await database.checkpoint.findMany({
        where: {
            userId
        }
    })
}  
 
export async function getAllCheckpoints(){

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