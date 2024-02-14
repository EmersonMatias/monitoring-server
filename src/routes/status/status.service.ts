import { StatusRepository as StatusR } from "./status.repository.js"
import { CreateStatus } from "./types.js"


async function create(userId: number, frequency: number) {
    const createStatusData: CreateStatus = {
        userId,
        frequency,
        timestamp: new Date()
    }

    return await StatusR.create(createStatusData)
}

async function deleteUnique(userId: number){
    return await StatusR.deleteUnique(userId)
}







export const StatusService = {
    create,deleteUnique
}