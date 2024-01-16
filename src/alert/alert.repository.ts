import { database } from "../../prisma/index.js";
import { dateTime } from "../functions.js";


export async function create(name: string){
   const {day,month,year} = dateTime()
   
    return await database.alert.create({
        data: {
            name,
            day: Number(day),
            month: Number(month),
            year: Number(year)
        }
    })
}

export async function findAll(){
    return await database.alert.findMany({})
}

export async function update(id: number){
    return await database.alert.update({
        where: {
            id
        },
        data: {
            viewed: true
        }
    })
}



export const AlertRepository = {
    create,findAll,update
}




