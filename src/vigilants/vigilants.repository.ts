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