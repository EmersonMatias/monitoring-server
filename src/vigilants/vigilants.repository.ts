import { database } from "../../prisma/index.js";

export async function deleteMessages(id: number){
    return await database.messages.deleteMany({
        where:{
            userId: id
        }
    })
}

export async function deleteVigilant(id: number){
    return await database.user.delete({
        where: {
            id
        }
    })
}

export async function vigilantComplete(id: number){
    return await database.user.findUnique({
        where: {
            id
        }, select: {
            checkpoint: true,
            messages: true,
            name: true,
            agency: true,
            entryTime: true,
            departureTime: true
        }
    })
}

export async function getAgencies(agency: string){
    return await database.user.findMany({
        where:{
            agency
        },
        select:{
            name: true,
            agency: true,
            entryTime: true,
            departureTime: true,
            checkpoint: true,
            messages: true
        }
    })
}