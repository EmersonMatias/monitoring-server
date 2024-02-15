import { convertDateToUTC, dateTime } from "../../functions.js"
import { VigilantService } from "../vigilants/vigilant.service.js"
import { CheckpointsRepository as CheckpointsR } from "./checkpoints.repository.js"
import { CreateCheckpoint } from "./type"

async function create(userId: number, agencyId: number) {
    const { date } = dateTime()
    const dateUTC = convertDateToUTC(date)

    const createCheckpointData: CreateCheckpoint = {
        userId,
        agencyId,
        date: dateUTC
    }

    return await CheckpointsR.create(createCheckpointData)
}

async function create2(userId: number, date: Date) {
    const vigilant = VigilantService.findUnique(userId)

    const createCheckpointData = {
        date,
        userId,
        agencyId: (await vigilant).agencyId
    }

    return await CheckpointsR.create(createCheckpointData)
}


async function findMany({ date }: { date?: Date }) {
    let checkpoints = await CheckpointsR.findMany({ date })

    if (checkpoints.length === 0) {
        const vigilants = await VigilantService.findMany()

        const createManyCheckpointsData = vigilants.map((vigilant) => {
            const data = {
                date,
                userId: vigilant.id,
                agencyId: vigilant.agencyId
            }

            return data
        })

        await CheckpointsR.createMany(createManyCheckpointsData)
    }

    return checkpoints
}

async function deleteMany(userId: number) {
    return await CheckpointsR.deleteMany(userId)
}




export const CheckpointsService = {
    create, findMany, deleteMany, create2
}