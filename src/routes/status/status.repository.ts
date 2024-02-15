import { database } from "../../../prisma/index.js";
import { CreateStatus } from "./types.js";

async function create(data: CreateStatus) {
    return await database.status.create({
        data
    })
}

async function deleteUnique(userId: number) {
    return await database.status.delete({
        where: {
            userId
        }
    })
}

async function findUnique(userId: number) {
    return await database.status.findUnique({
        where: {
            userId
        }
    })
}

async function findMany(){
    return await database.status.findMany({
        where:{
        user: {
            accountType: 'user'
        }            
        },
        select: {
            id: true,
            frequency: true,
            situation: true,
            timestamp: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    entryTime: true,
                    departureTime: true,
                    agency: true,
                }
            }
        }
    })
}

async function update(id: number, situation: "OK" | "PANIC") {

    return await database.status.update({
        where: {
            id
        },
        data: {
            timestamp: new Date(),
            situation
        }
    })
}

export const StatusRepository = {
    create, deleteUnique, findUnique,update,findMany
}