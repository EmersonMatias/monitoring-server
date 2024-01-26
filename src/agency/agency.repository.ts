import { database } from "../../prisma/index.js";


async function create(name: string) {
    return await database.agency.create({
        data: {
            name
        }
    })
}

async function findAll() {
    return await database.agency.findMany()
} 

async function findOne(id: number) {
    return await database.agency.findUnique({
        where:{
            id
        }
    })
}

async function deleteOne(id: number) {
    return await database.agency.delete({
        where: {
            id
        }
    })
}


export const AgencyRepository = {
    create, findAll, deleteOne, findOne
}


