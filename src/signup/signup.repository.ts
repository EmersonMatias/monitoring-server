
import { database } from "../../prisma/index.js";
import { SignUp } from "./signup.types.js";


export async function createNewUser(signupData: SignUp ){
    const {name, password, login, rg, cpf, hour, agency, account_type} = signupData

    return await database.user.create({
        data:{
            name
        }
    })
}