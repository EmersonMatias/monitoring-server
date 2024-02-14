import { database } from "../../../prisma/index.js";
import { CreateStatus } from "./types.js";

async function create(data: CreateStatus){
    return await database.status.create({
        data
    })
}

async function deleteUnique(userId: number){
    return await database.status.delete({
        where:{
            userId
        }
    })
}




export const StatusRepository = {
    create, deleteUnique
}