import { VigilantService } from "../vigilants/vigilant.service.js"
import { ContingencyRepository as ContingencyR, ContingencyRepository } from "./contingency.repository.js"
import { CreateContingency } from "./type.js"

async function create(userId: number) {
    const createContingencyData: CreateContingency = {
        userId,
        timestamp: new Date()
    }

    return ContingencyR.create(createContingencyData)
}

async function deleteUnique(userId: number) {
    return await ContingencyR.deleteUnique(userId)
}

async function update(userId: number, situation: "OK" | "PANIC", active: boolean, frequency: number) {
    await VigilantService.findUnique(userId)

    return await ContingencyRepository.update(userId, active, situation,frequency)
}

async function findMany(){
    return await ContingencyRepository.findMany()
}

async function findUnique(userId: number){
    return await ContingencyRepository.findUnique(userId)
}

export const ContingencyService = {
    create, deleteUnique,update,findMany,findUnique
}