
import { Errors } from "../errors.js";
import { createNewUser, findUserByLogin } from "./signup.repository.js";
import { SignUp } from "./signup.types";
import { hashSync } from "bcrypt"


export async function registerVigilant(signupData: SignUp) {
    const loginExist = await findUserByLogin(signupData.login)

    if (loginExist) throw Errors.EmailExist

    const encryptedPassword = hashSync(signupData.password, 10)

    const newSignupData = { ...signupData, password: encryptedPassword }

    return await createNewUser(newSignupData)
}


export const signupServices = {
    registerVigilant
}