import { TSignInData } from "./signin.middlewares.js";

async function connectUser(signinData: TSignInData) {
    //const loginExist = await findUserByLogin(signinData.login)

    //if(!loginExist) throw Errors.EmailDoesntExist

    //const passwordIsCorrect = compareSync(signinData.password, loginExist.password)

    //if(!passwordIsCorrect) throw Errors.IncorrectPassword

    /*
    const dataToken = {
        userId: loginExist.id,
    }
    */

  /**
   * 
   *   const acessToken = jwt.sign(dataToken, process.env.ACESS_TOKEN_SECRET)

    const userData = {
        name: loginExist.name,
        userId: loginExist.id,
        accountType: loginExist.accountType,
        entryTime: loginExist.entryTime,
        agency: loginExist.agencyId,
        token: acessToken
    }
   */
 
    return "userData"
}


export const signinServices = {
    connectUser
}