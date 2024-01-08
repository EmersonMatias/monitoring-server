import { database } from "../../prisma/index.js";

export async  function createStatus(userId: number){
    const status = "OK"

    return await database.status.create({
        data:{
         status,
         userId
        }
    })
}

export async function findAllStatus(){
    return await database.status.findMany({
        include:{
            user: {
                select: {
                    name: true,
                    entryTime: true,
                    departureTime: true,
                    agency: true
                }
            }
        }
    })
}


export async function findStatusById(userId: number){
    return await database.status.findMany({
        where: {
            userId
        }
    }) 
} 


export async function updateById(id: number, status: string){
    return await database.status.update({
        where: {
            id
        },data: {
            status,
            time: new Date()
        }
    })
}

export async function deleteStatus(userId: number){
    return await database.status.deleteMany({
        where:{
            userId
        }
    })
}

