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

//CRIAR CHECKPOINT DE APENAS UM USUÁRIO *****
export async function createCheckPoint(checkpointData: TCheckpointData) {
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



//CRIAR TODOS OS CHECKPOINTS DOS DOS VIGILANTES *****
export async function createCheckPoints(checkpointData: TCheckpointData[]) {


    return await database.checkpoint.createMany({
        data: checkpointData
    })
}

//MARCAR CHECKPOINT *****
export async function markCheckPoint(markCheckPointData: TMarkCheckPointData) {
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

//PEGAR TODOS OS CHECKPOINTS DO USUÁRIO
export async function getUserCheckpoints(userId: number) {

    return await database.checkpoint.findMany({
        where: {
            userId
        }
    })
}

//PEGAR TODOS OS CHECKPOINTS DO USUÁRIO DO DIA
export async function findCheckpointByIdByCurrentDate(userId: number) {
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

// PEGAR TODOS OS CHECKPOINTS DO DIA *****
export async function findCheckpointByDay() {
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

//PEGAR TODOS OS CHECKPOINTS *****
export async function getAllCheckpoints() {

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

//EXCLUIR TODOS CHECKPOINTS DO VIGILANTE
export async function deleteCheckpoints(id: number) {
    return await database.checkpoint.deleteMany({
        where: {
            userId: id
        }
    })
}

//PEGAR TODOS OS CHECKPOINTS DE UMA AGÊNCIA
export async function getCheckpointAgency(agency: string) {
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

//PEGAR TODOS OS CHECKPOINTS DE UMA AGÊNCIA COM FILTRO DE DATA ***
export async function getCheckpointAgencyWithFilter(agency: string, filter: TFilterCheckpoints) {
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

//PEGAR Checkpoints pela Data
export async function getCheckpointByIDByDate( filter: TFilterCheckpoints) {
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
