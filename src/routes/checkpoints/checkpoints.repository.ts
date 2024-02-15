import { database } from "../../../prisma/index.js"
import { CreateCheckpoint } from "./type.js"

async function create(data: CreateCheckpoint) {
    return await database.checkpoint.create({
        data
    })
}

async function createMany(data: CreateCheckpoint[]) {
    return await database.checkpoint.createMany({
        data
    })
}

async function findUnique({ userId, date }: { userId: number, date: Date }) {
    return await database.checkpoint.findMany({
        where: {
            userId,
            date
        },
        select: {
            id: true,
            date: true,
            arrived: true,
            arrivalTime: true
        }
    })
}

async function findMany({ date }: { date?: Date }) {
    return await database.checkpoint.findMany({
        where: {
            date: date,
            user: {
                accountType: "user"
            }
        },
        select: {
            id: true,
            date: true,
            arrived: true,
            arrivalTime: true,
            agencyId: false,
            userId: false,
            agency: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    entryTime: true,
                    departureTime: true,
                    workOnSaturday: true,
                    workOnSunday: true
                }
            }
        }
    })
}

async function deleteMany(userId: number) {
    return await database.checkpoint.deleteMany({
        where: {
            userId
        }
    })
}

async function update(id: number, arrivalTime: Date) {
    return await database.checkpoint.update({
        where: {
            id
        },
        data: {
            arrivalTime,
            arrived: true
        }
    })
}

export const CheckpointsRepository = {
    create, findMany, deleteMany, createMany, findUnique, update
}
