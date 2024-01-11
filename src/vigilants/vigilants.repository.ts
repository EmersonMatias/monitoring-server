import { hashSync } from "bcrypt";
import { database } from "../../prisma/index.js";

export async function deleteMessages(id: number) {
    return await database.messages.deleteMany({
        where: {
            userId: id
        }
    })
}

export async function deleteVigilant(id: number) {
    return await database.user.delete({
        where: {
            id
        }
    })
}

export async function vigilantComplete(id: number) {
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


export async function getAgencies(agency: string) {
    return await database.user.findMany({
        where: {
            agency
        },
        select: {
            name: true,
            agency: true,
            entryTime: true,
            departureTime: true,
            checkpoint: true,
            messages: true
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

export async function updateVigilant(updateUserData: UpdateUser) {
    const { id, agency, cpf, dateofbirth, departureTime, entryTime, login, name, rg, password,saturday,sunday} = updateUserData

    const encryptedPassword = hashSync(password, 10)
    const saturdayT = saturday === "true" ? true : false
    const sundayT = sunday === "true" ? true : false
    return await database.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            agency,
            cpf,
            dateofbirth,
            entryTime,
            departureTime,
            login,
            rg,
            password: encryptedPassword,
            saturday: saturdayT,
            sunday: sundayT
        }
    })
}

type UpdateUser = {
    id: string,
    name: string,
    agency: string,
    cpf: string,
    dateofbirth: string,
    entryTime: string,
    departureTime: string,
    login: string,
    rg: string,
    password: string,
    saturday: string,
    sunday: string
}