import { database } from "../../../prisma/index.js";

async function create(name: string) {
    return await database.agency.create({
        data: {
            name
        }
    })
}

async function findUnique({id, name}: {id?: number, name?: string}){
    return await database.agency.findUnique({
        where:{
            id,
            name
        }
    })
}

async function findMany(){
    return await database.agency.findMany()
}



export const AgencyRepository = {
    create,findUnique,findMany
}


