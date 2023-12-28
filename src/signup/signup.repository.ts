
import { database } from "../../prisma/index.js";
import { SignUp } from "./signup.types.js";

export async function createNewUser(signupData: SignUp ){
    const {name, password, login, rg, cpf, dateofbirth,departureTime,entryTime, agency, accountType} = signupData
   
    return await database.user.create({ 
        data:{
          name,
          dateofbirth,
          login,
          password,
          rg,
          cpf,
          agency,
          entryTime,
          departureTime,
          accountType
        }
    })
}

export async function findAllUsers(){
  return await database.user.findMany()
}

export async function findUserByLogin(login: string){
  return await database.user.findUnique({
    where: {
      login
    }
  })
}