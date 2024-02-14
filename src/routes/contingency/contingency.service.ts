import { ContingencyRepository as ContingencyR } from "./contingency.repository.js"
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

export const ContingencyService = {
    create, deleteUnique
}