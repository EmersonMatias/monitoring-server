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

async function findUniqueFilter({ id, initialDate, finalDate }: { id: number, initialDate: Date, finalDate: Date }){
    const dates = (finalDate?.getUTCDate()+1)
    finalDate?.setUTCDate(dates)
   
    return await database.agency.findUnique({
        where:{
            id
        },
        select: {
            name: true,
            Messages: {
                where: {
                    dateTime: {
                        gte: initialDate,
                        lte: finalDate
                    }
                },
                select:{
                    id: true,
                    dateTime: true,
                    message: true,
                    response: true,
                    viewed: true,
                    user:{
                        select:{
                            name: true,
                            entryTime: true,
                            departureTime: true,
                        }
                    }
                }
            },
            Checkpoint:{
                where: {
                    date: {
                        gte: initialDate,
                        lt: finalDate
                    }
                },
                select:{
                    id: true,
                    date: true,
                    arrived: true,
                    arrivalTime: true,
                    user: {
                        select:{
                            name: true,
                            entryTime: true,
                            departureTime: true,
                        }
                    }
                }
            }
        }
    })
}

async function findMany(){
    return await database.agency.findMany({
        where:{
            User: {
                every: {
                    accountType: 'user'
                }
            }
        }
    })
}



export const AgencyRepository = {
    create,findUnique,findMany,findUniqueFilter
}


