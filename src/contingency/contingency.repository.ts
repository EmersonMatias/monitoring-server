import { database } from "../../prisma/index.js";
import { dateTime } from "../functions.js";


export type TCreateContingencyData = {
    userId: number,
    hour?: number,
    minute?: number,
    frequency?: number,
    status?: string,
    contigency?: boolean
}

export type TActivateContingencyData = {
    userId: number,
    frequency: number,
}

export type TDeactivateContingencyData = {
    userId: number
}

export type TCheckpointContingencyData = {
    userId: number,
    status: string
}

async function create(createContingencyData: TCreateContingencyData) {
    const { contigency, frequency, hour, minute, status, userId } = createContingencyData

    return await database.contingency.create({
        data: {
            userId,
            hour,
            minute,
            frequency,
            status,
            contigency
        }
    })
}

async function activate(activateContingencyData: TActivateContingencyData) {
    const { userId, frequency } = activateContingencyData
    const contigency = true
    const { hour, minute } = dateTime()

    return database.contingency.update({
        where: {
            userId
        },
        data: {
            frequency,
            contigency,
            hour: Number(hour),
            minute: Number(minute),
            status: "OK"
        }
    })
}

async function deactivate(deactivateContingencyData: TDeactivateContingencyData) {
    const { userId } = deactivateContingencyData
    const contigency = false

    return await database.contingency.update({
        where: {
            userId
        },
        data: {
            contigency
        }
    })
}

async function checkpoint(checkpointContingencyData: TCheckpointContingencyData) {
    const { userId, status } = checkpointContingencyData
    const { hour, minute } = dateTime()

    return await database.contingency.update({
        where: {
            userId
        },
        data: {
            status,
            hour: Number(hour),
            minute: Number(minute)
        }
    })
}

async function getAll() {
    return await database.contingency.findMany({
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    })
}

async function getByUserID(userId: number) {
    return await database.contingency.findUnique({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    })
}

async function remove(userId: number) {
    return database.contingency.delete({
        where: {
            userId
        }
    })
}


export const ContingencyRepository = {
    create, activate, deactivate, checkpoint, getAll, getByUserID, remove
}



