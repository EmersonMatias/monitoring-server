import { database } from "../../prisma/index.js"

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
 
//Pegar todos os checkpoints
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

//Excluir um checkpoint
export async function deleteCheckpoints(id: number){
    return await database.checkpoint.deleteMany({
        where:{
            userId: id
        }
    })
}