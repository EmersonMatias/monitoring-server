import { VigilantService } from "../vigilants/vigilant.service.js"
import { StatusRepository as StatusR, StatusRepository } from "./status.repository.js"
import { CreateStatus } from "./types.js"


async function create(userId: number, frequency: number) {
    const createStatusData: CreateStatus = {
        userId,
        frequency,
        timestamp: new Date()
    }

    return await StatusR.create(createStatusData)
}

async function deleteUnique(userId: number) {
    return await StatusR.deleteUnique(userId)
}

async function findUnique(userId: number) {
    await VigilantService.findUnique(userId)

    return await StatusRepository.findUnique(userId)
}

async function findMany(){
    return await StatusR.findMany()
}

async function update(id: number, situation: "OK" | "PANIC") {
    return await StatusRepository.update(id, situation)
}


export const StatusService = {
    create, deleteUnique, findUnique,update,findMany
}