import { Request, Router, Response } from "express"

const route = Router()
export const vigilants = [
    {
        "name": "Emerson Rodrigo dos Santo",
        "hour": "14:20",
        "agency": "Agência Bancária",
        "arrived": true

    },
    {
        "name": "Adriana Jovenato",
        "hour": "11:20",
        "agency": "Agência Correios",
        "arrived": false
    },
    {
        "name": "Marta Maria",
        "hour": "15:20",
        "agency": "Agência Correios",
        "arrived": true
    },
    {
        "name": "Marcos Maria",
        "hour": "18:20",
        "agency": "Agência Correios",
        "arrived": false
    }
] 
  

route.get("/vigilants", (req: Request, res: Response) => {

    console.log(vigilants)
    res.send(vigilants)
})
 

export default route

