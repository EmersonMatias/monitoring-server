import { Request, Router, Response } from "express"
import { findAllUsers } from "../signup/signup.repository.js"
import { deleteMessages, deleteVigilant, getAgencies, updateVigilant, vigilantComplete, vigilantCompleteWithFilter, vigilantWithStatus } from "./vigilants.repository.js"
import { deleteCheckpoints } from "../checkpoints/checkpoints.repository.js"
import { deleteStatus, updateByUserId } from "../status/status.repository.js"
import { ContingencyRepository } from "../contingency/contingency.repository.js"

const route = Router()

route.get("/vigilants", async (req: Request, res: Response) => {
    const sucess = await findAllUsers()

    return res.status(200).send(sucess)
})

route.delete("/vigilants/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = Number(id)

    if (isNaN(userId)) return (
        res.status(400).send("String is invalid!")
    )

    const sucessM = await deleteMessages(userId)
    const sucessC = await deleteCheckpoints(userId)
    const sucessS = await deleteStatus(userId)
    const sucessCon = await ContingencyRepository.remove(userId)
    const sucess = await deleteVigilant(userId)
    console.log(sucess)
    res.send(sucess)
})

route.get("/vigilants/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = Number(id)

    if (isNaN(userId)) return (
        res.status(400).send("String is invalid!")
    )

    const sucess = await vigilantComplete(userId)
    res.send(sucess)

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


route.post("/updatevigilant/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const {agency, cpf, dateofbirth, departureTime, entryTime, login, name, rg, frequency,saturday,sunday} = req.body as TUpdateUser


    try {
        const sucess = await updateVigilant({id, agency, cpf, dateofbirth, departureTime, entryTime, login, name, rg,saturday, sunday})
        await updateByUserId(id, frequency)
        res.send(sucess)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

type TUpdateUser = {
    name: string;
    dateofbirth?: string ;
    rg: string ;
    cpf: string ;
    agency: string ;
    entryTime: string ;
    departureTime: string;
    login: string;
    password?: string ;
    frequency: number ;
    saturday: string;
    sunday: string
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

route.get("/agency/:agency", async (req: Request, res: Response) => {
    const { agency } = req.params

    const sucess = await getAgencies(agency)
    res.send(sucess)
})

export default route

