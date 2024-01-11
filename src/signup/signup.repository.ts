
import { database } from "../../prisma/index.js";
import { SignUp } from "./signup.types.js";

export async function createNewUser(signupData: SignUp ){
    const {name, password, login, rg, cpf, dateofbirth,departureTime,entryTime, agency, accountType,saturday,sunday} = signupData
   
  const saturdayT = saturday === "true" ? true : false
  const sundayT = sunday === "true" ? true : false


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
          accountType,
          saturday:saturdayT,
          sunday: sundayT
        }
    })
}

export async function findAllUsers(){
  return await database.user.findMany({
    where: {
      accountType: "user",
    },
    select: {
      id: true,
      name: true,
      entryTime: true,
      departureTime: true,
      agency: true,
      saturday: true,
      sunday: true
    }
  })
}

export async function findUserByLogin(login: string){
  return await database.user.findUnique({
    where: {
      login
    }
  })
}