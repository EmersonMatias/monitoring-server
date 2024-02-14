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


export const ContingencyRepository = {
    create,deleteUnique
}


