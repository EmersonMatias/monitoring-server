import { compareSync } from "bcrypt";
import { CustomError, ErrorPasswordIncorrect, ErrorVigilantDoesntExist } from "../../errors/errors.js";
import { VigilantRepository } from "../vigilants/vigilants.repository.js";
import { TSignInData } from "./signin.middlewares.js";
import jwt from 'jsonwebtoken'

async function connectUser(signinData: TSignInData) {

    const loginExist = await VigilantRepository.findUnique({login: signinData.login})

    if(!loginExist) throw new CustomError(ErrorVigilantDoesntExist.message, ErrorVigilantDoesntExist.status)

    const passwordIsCorrect = compareSync(signinData.password, loginExist.password)

    if(!passwordIsCorrect) throw new CustomError(ErrorPasswordIncorrect.message, ErrorPasswordIncorrect.status)

    const dataToken = {
        userId: loginExist.id,
    }
    

    const acessToken = jwt.sign(dataToken, process.env.ACESS_TOKEN_SECRET)

    const userData = {
        name: loginExist.name,
        userId: loginExist.id,
        accountType: loginExist.accountType,
        entryTime: loginExist.entryTime,
        agency: loginExist.agencyId,
        token: acessToken
    }
   
    return userData
}


export const signinServices = {
    connectUser
}