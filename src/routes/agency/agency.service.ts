import { CustomError, ErrorAgencyAlredyExist } from "../../errors/errors.js"
import { AgencyRepository as AgencyR } from "./agency.repository.js"

async function create(name: string) {
    const agencyExist = await AgencyR.findUnique({ name })

    if (agencyExist) throw new CustomError(ErrorAgencyAlredyExist.message, ErrorAgencyAlredyExist.status)

    const agency = AgencyR.create(name)

    return agency
}

async function findMany(){
    return await AgencyR.findMany()
}

async function findUniqueFilter(id: number, initialDate: Date, finalDate: Date){

    return await AgencyR.findUniqueFilter({ id, initialDate, finalDate })
}


export const AgencyService = {
    create,findMany,findUniqueFilter
}