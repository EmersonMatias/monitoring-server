import { database } from "../../prisma/index.js"
import { dateTime } from "../functions.js"

type TCheckpointData = {
    userId: number
    day: number,
    month: number,
    year: number
}

type TMarkCheckPointData = {
    checkpointId: number
    arrived: boolean
    arrivalTime: string
}

async function create(checkpointData: TCheckpointData) {
    const { userId, day, month, year } = checkpointData

    return await database.checkpoint.create({
        data: {
            userId,
            day,
            month,
            year
        }
    })
}

async function createAll(checkpointData: TCheckpointData[]) {


    return await database.checkpoint.createMany({
        data: checkpointData
    })
}

async function findAll() {

    return await database.checkpoint.findMany({
        select: {
            arrived: true,
            arrivalTime: true,
            day: true,
            month: true,
            year: true,
            user: {
                select: {
                    name: true,
                    agency: true,
                    entryTime: true
                }
            }
        }
    })
}

async function findAllCheckpointsByUserId(userId: number) {

    return await database.checkpoint.findMany({
        where: {
            userId
        }
    })
}

async function findAllCheckpointsOfTheDay() {
    const { day, month, year } = dateTime()

    return await database.checkpoint.findMany({
        where: {
            day: Number(day),
            month: Number(month),
            year: Number(year)
        },
        select: {
            arrivalTime: true,
            arrived: true,
            day: true,
            month: true,
            year: true,
            user: {
                select: {
                    name: true,
                    agency: true,
                    entryTime: true
                }
            }
        }
    })

}

async function findAllCheckpointsOfTheDayByUserId(userId: number) {
    const { day, month, year } = dateTime()

    return await database.checkpoint.findFirst({
        where: {
            userId,
            day: Number(day),
            month: Number(month),
            year: Number(year)
        }
    })

}

async function findAllCheckpointsByAgency(agency: string) {
    return await database.checkpoint.findMany({
        where: {
            user: {
                agency
            }
        },
        include: {
            user: {
                select: {
                    name: true,
                    entryTime: true,
                    departureTime: true
                }
            }
        }
    })
}

async function findAllCheckpointsByDate(filter: TFilterCheckpoints) {
    const { day, month, year } = filter

    return await database.checkpoint.findMany({
        where: {
            day: {
                gte: day.first,
                lte: day.end
            },
            month: {
                gte: month.first,
                lte: month.end
            },
            year: {
                gte: year.first,
                lte: year.end
            }
        }
    })
}

async function findAllCheckpointsByAgencyByDate(agency: string, filter: TFilterCheckpoints) {
    const { day, month, year } = filter

    return await database.checkpoint.findMany({
        where: {
            user: {
                agency
            },
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
        },
        include: {
            user: {
                select: {
                    name: true,
                    entryTime: true,
                    departureTime: true
                }
            }
        }
    })
}

async function deleteAll(id: number) {
    return await database.checkpoint.deleteMany({
        where: {
            userId: id
        }
    })
}

async function updateCheckpoint(markCheckPointData: TMarkCheckPointData) {
    const { arrivalTime, arrived, checkpointId } = markCheckPointData

    return await database.checkpoint.update({
        where: {
            id: checkpointId
        },
        data: {
            arrivalTime,
            arrived
        }
    })
}

export const CheckpointsRepository = {
    create, findAllCheckpointsOfTheDay, createAll, findAllCheckpointsByUserId,
    findAllCheckpointsOfTheDayByUserId, findAll, deleteAll, findAllCheckpointsByAgency,
    findAllCheckpointsByAgencyByDate, findAllCheckpointsByDate,updateCheckpoint
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
