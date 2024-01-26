import { database } from "../../prisma/index.js";

export async function deleteMessages(id: number) {
    return await database.messages.deleteMany({
        where: {
            userId: id
        }
    })
}

export async function vigilantWithStatus(id: number) {
    return await database.user.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            cpf: true,
            rg: true,
            dateofbirth: true,
            entryTime: true,
            departureTime: true,
            login: true,
            agency: true,
            password: false,
            saturday: true,
            sunday: true,
            status: {
                select: {
                    frequency: true
                }
            }
        }

    })
}

export async function vigilantCompleteWithFilter(id: number, filter: TFilterCheckpoints) {
    const { day, month, year } = filter

    return await database.user.findUnique({
        where: {
            id
        }, select: {
            checkpoint: {
                where: {
                    day: {
                        gte: Number(day.first),
                        lte: Number(day.end)
                    },
                    month: {
                        gte: Number(month.first),
                        lte: Number(month.end)
                    },
                    year: {
                        gte: Number(year.first),
                        lte: Number(year.end)
                    }
                }
            },
            messages: {
                where: {
                    day: {
                        gte: Number(day.first),
                        lte: Number(day.end)
                    },
                    month: {
                        gte: Number(month.first),
                        lte: Number(month.end)
                    },
                    year: {
                        gte: Number(year.first),
                        lte: Number(year.end)
                    }
                }
            },
            name: true,
            agency: true,
            entryTime: true,
            departureTime: true
        }
    })
}

type TFilterCheckpoints = {
    day: {
        first: number,
        end: number
    },
    month: {
        first: number,
        end: number
    },
    year: {
        first: number,
        end: number
    }
}


async function findOneById(id: number) {
    return await database.user.findUnique({
        where: {
            id
        }, select: {
            name: true,
            dateofbirth: true,
            login: true,
            rg: true,
            cpf: true,
            entryTime: true,
            departureTime: true,
            saturday: true,
            sunday: true,
            agency: true,
            status: {
                select: {
                    frequency: true
                }
            }
        }
    })
} 

async function findAll(agencyId?: number | undefined){
    return await database.user.findMany({
        where: {
            accountType: "user",
            agencyId
        },
        select: {
            id: true,
            name: true,
            entryTime: true,
            departureTime: true,
            agency: true,
            saturday: true,
            sunday: true,
            contigency: true,
        }
    })
}

async function update(updateUserData: UpdateUser) {
    const { id, agencyId, cpf, dateofbirth, departureTime, entryTime, login, name, rg, saturday, sunday } = updateUserData

    const saturdayT = saturday === "true"
    const sundayT = sunday === "true"
    return await database.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            agencyId: Number(agencyId),
            cpf,
            dateofbirth,
            entryTime,
            departureTime,
            login,
            rg,
            saturday: saturdayT,
            sunday: sundayT
        }
    })
} 

async function deleteOne(id: number) {
    return await database.user.delete({
        where: {
            id
        }
    })
}




export const VigilantsRepository = {
    findAll, findOneById, update, deleteOne
}

type UpdateUser = {
    id: string,
    name: string,
    agencyId: number,
    cpf: string,
    dateofbirth: string,
    entryTime: string,
    departureTime: string,
    login: string,
    rg: string,
    saturday: string,
    sunday: string
}