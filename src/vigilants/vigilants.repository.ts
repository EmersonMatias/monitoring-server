import { database } from "../../prisma/index.js";

export async function deleteMessages(id: number){
    return await database.messages.deleteMany({
        where:{
            userId: id
        }
    })
}

export async function deleteVigilant(id: number){
    return await database.user.delete({
        where: {
            id
        }
    })
}