
import { database } from "../../prisma/index.js";
import { SignUp } from "./signup.types.js";

export async function createNewUser(signupData: SignUp) {
  const { name, password, login, rg, cpf, dateofbirth, departureTime, entryTime, agencyId, accountType, saturday, sunday } = signupData

  const saturdayT = saturday === "true"
  const sundayT = sunday === "true"

  return await database.user.create({
    data: {
      name,
      dateofbirth,
      login,
      password,
      rg,
      cpf,
      agencyId,
      entryTime,
      departureTime,
      accountType,
      saturday: saturdayT,
      sunday: sundayT
    }
  })
}

export async function findUserByLogin(login: string) {
  return await database.user.findUnique({
    where: {
      login
    }
  })
}