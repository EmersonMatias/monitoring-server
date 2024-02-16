import { hashSync } from "bcrypt";
import { Vigilant, UpdateVigilantBody, VigilantBody } from "./types";
import { VigilantRepository as VigilantR } from "./vigilants.repository.js";
import { ContingencyService as ContingencyS } from "../contingency/contingency.service.js";
import { StatusService as StatusS } from "../status/status.service.js";
import { CheckpointsService as CheckpointsS } from "../checkpoints/checkpoints.service.js";
import { CustomError, ErrorUserAlredyExist, ErrorVigilantDoesntExist } from "../../errors/errors.js";

async function create(data: VigilantBody) {
    const { password, login, frequency } = data

    delete data.frequency
    //Verifica se o vigilante existe
    const vigilantExist = await VigilantR.findUnique({ login })

    if (vigilantExist) throw new CustomError(ErrorUserAlredyExist.message, ErrorUserAlredyExist.status)

    //Encriptação da senha
    const encryptedPassword = hashSync(password, 10)

    const createVigilantData: Vigilant = {
        ...data,
        password: encryptedPassword
    }

    const vigilant = await VigilantR.create(createVigilantData)
    await ContingencyS.create(vigilant.id)
    await StatusS.create(vigilant.id, frequency)
    await CheckpointsS.create(vigilant.id, vigilant.agencyId)

    return vigilant
}

async function update(id: number, data: UpdateVigilantBody) {
    const { frequency } = data

    delete data.frequency

    const vigilantUpdate = await VigilantR.update(id, data)

    return vigilantUpdate
}

async function findMany() {
    const vigilants = await VigilantR.findMany()

    return vigilants
}

async function findUnique(id: number) {
    const vigilant = await VigilantR.findUnique({ id })

    if (!vigilant) throw new CustomError(ErrorVigilantDoesntExist.message, ErrorVigilantDoesntExist.status)

    return vigilant
}

async function findUniqueFilter(id: number, initialDate: Date, finalDate: Date) {
    await VigilantService.findUnique(id)

    return await VigilantR.findUniqueFilter({ id, initialDate, finalDate })

}

async function deleteUnique(userId: number) {
    const id = userId
    const vigilant = await VigilantR.findUnique({ id })

    if (!vigilant) throw new CustomError(ErrorVigilantDoesntExist.message, ErrorVigilantDoesntExist.status)

    await StatusS.deleteUnique(userId)
    await ContingencyS.deleteUnique(userId)
    await CheckpointsS.deleteMany(userId)

    return await VigilantR.deleteUnique(userId)
}

export const VigilantService = {
    create, findMany, findUnique, deleteUnique, update,findUniqueFilter
}