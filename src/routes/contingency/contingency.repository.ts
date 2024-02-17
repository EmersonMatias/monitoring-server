import { database } from "../../../prisma/index.js";
import { CreateContingency } from "./type.js";

async function create(data: CreateContingency) {
    return await database.contingency.create({
        data
    })
}

async function deleteUnique(userId: number){
    return await database.contingency.delete({
        where:{
            userId
        }
    })
}

async function update(userId: number, active: boolean, situation: "OK" | "PANIC", frequency: number){
    return await database.contingency.update({
        where:{
            userId
        },
        data: {
            active,
            situation,
            frequency,
            timestamp: new Date()
        }
    })
}

async function findMany(){
    return await database.contingency.findMany({
        select:{
            id: true,
            active: true,
            frequency: true,
            situation: true,
            timestamp: true,
            user: {
                select:{
                    name: true,
                    agency: true
                }
            }
        }
    })
}

async function findUnique(userId: number){
    return await database.contingency.findUnique({
        where:{
            userId
        },
        select:{
            id: true,
            active: true,
            frequency: true,
            situation: true,
            timestamp: true,
            user: {
                select:{
                    name: true,
                    agency: true
                }
            }
        }
    })
}

export const ContingencyRepository = {
    create,deleteUnique,update,findMany,findUnique
}


