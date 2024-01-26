import { Request, Router, Response } from "express"
import { VigilantsRepository as Vigilants, deleteMessages, vigilantCompleteWithFilter, vigilantWithStatus } from "./vigilants.repository.js"
import { deleteStatus, updateByUserId } from "../status/status.repository.js"
import { ContingencyRepository as Contingency } from "../contingency/contingency.repository.js"
import { CheckpointsRepository as Checkpoints } from "../checkpoints/checkpoints.repository.js"

const route = Router()

route.get("/vigilants", async (req: Request, res: Response) => {
    const agencyId = req.query.agencyId
   
    const agencyIda  = agencyId ? Number(agencyId) : undefined

    try {
        const sucess = await Vigilants.findAll(agencyIda)

        return res.status(200).send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.get("/vigilants/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    console.log("vigilants/id")


    try {
        const sucess = await Vigilants.findOneById(Number(id))
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.post("/vigilants/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const updateUserData = req.body as TUpdateUser


    try {
        const sucess = await Vigilants.update(updateUserData)
        await updateByUserId(id, updateUserData.frequency)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.delete("/vigilants/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = Number(id)

    if (isNaN(userId)) return (
        res.status(400).send("String is invalid!")
    )

    try {
        await deleteMessages(userId)
        await Checkpoints.deleteAll(userId)
        await deleteStatus(userId)
        await Contingency.deleteOne(userId)

        const sucess = await Vigilants.deleteOne(userId)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }


})

route.get("/vigilantwithstatus=:id", async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const sucess = await vigilantWithStatus(Number(id))

        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

route.post("/vigilantsfilter=:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const { filter } = req.body as TFilterCheckpoints
    const userId = Number(id)
    console.log(id)
    console.log(filter)


    if (isNaN(userId)) return (
        res.status(400).send("String is invalid!")
    )

    const sucess = await vigilantCompleteWithFilter(userId, filter)
    res.send(sucess)

})




export type TUpdateUser = {
    id: string,
    name: string,
    agencyId: number,
    cpf: string,
    dateofbirth: string,
    entryTime: string,
    departureTime: string,
    login: string,
    rg: string,
    saturday: string,
    sunday: string
    frequency: number
}

type TFilterCheckpoints = {
    filter: {
        day: {
            first: number,
            end: number
        },
        month: {
            first: number,
            end: number
        },
        year: {
            first: number,
            end: number
        }
    }

}

export default route

