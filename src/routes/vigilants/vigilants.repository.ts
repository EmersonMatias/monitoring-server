import { database } from "../../../prisma/index.js";
import { Vigilant, UpdateVigilantBody } from "./types.js";

async function create(data: Vigilant) {
    return await database.user.create({
        data
    })
}

async function update(id: number, data: UpdateVigilantBody) {
    return await database.user.update({
        where: {
            id
        },
        data
    })
}

async function findUnique({ login, id }: { login?: string, id?: number }) {
    return await database.user.findUnique({
        where: {
            id,
            login
        }, include: {
            contigency: {
                select: {
                    userId: false,
                    active: true,
                    frequency: true,
                    id: true,
                    situation: true,
                    timestamp: true
                }
            },
            status: {
                select: {
                    id: true,
                    frequency: true,
                    situation: true,
                    timestamp: true,
                    userId: false
                }
            },
            checkpoint: {
                select: {
                    id: true,
                    arrivalTime: true,
                    arrived: true,
                    date: true,
                }
            },
            agency: true
        }
    })
}

async function findUniqueFilter({ id, initialDate, finalDate }: { id: number, initialDate: Date, finalDate: Date }) {
    const dates = (finalDate?.getUTCDate()+1)
    finalDate?.setUTCDate(dates)
    
    console.log(finalDate)
    return await database.user.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            entryTime: true,
            departureTime: true,
            agency: true,
            checkpoint: {
                where: {
                    date: {
                        gte: initialDate,
                        lt: finalDate
                    }
                },
                select: {
                    id: true,
                    date: true,
                    agency: true,
                    arrived: true,
                    arrivalTime: true,
                }
            },
            messages: {
                where: {
                    dateTime: {
                        gte: initialDate,
                        lte: finalDate
                    }
                },
                select: {
                    id: true,
                    message: true,
                    dateTime: true,
                    viewed: true,
                    response: true,
                    agency: true
                }
            }
        }
    })
}

async function findMany() {
    return await database.user.findMany({
        where: {
            accountType: 'user'
        },
        select: {
            id: true,
            dateOfBirth: true,
            agencyId: true,
            cpf: true,
            rg: true,
            name: true,
            entryTime: true,
            departureTime: true,
            login: true,
            workOnSaturday: true,
            workOnSunday: true,
            contigency: {
                select: {
                    id: true,
                    active: true,
                    frequency: true,
                    situation: true,
                    timestamp: true,
                    userId: false
                }
            },
            status: {
                select: {
                    id: true,
                    frequency: true,
                    situation: true,
                    timestamp: true,
                    userId: false
                }
            },
            agency: true
        },

    })
}

async function deleteUnique(id: number) {
    return await database.user.delete({
        where: {
            id
        }
    })
}

export const VigilantRepository = {
    create, findUnique, findMany, deleteUnique, update,findUniqueFilter
}


