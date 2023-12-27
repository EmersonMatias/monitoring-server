import { Request, Response, Router } from "express"
import { validateSignUpData } from "./signup.middleware.js"
import { registerVigilant } from "./signup.controller.js"
import { findUserByLogin } from "./signup.repository.js"

   
const route = Router()

route.post("/cadastrar", validateSignUpData, registerVigilant)

route.get("/teste",async (req:Request, res: Response) => {

    const sucess = await findUserByLogin("adriana")
    
    res.send(sucess)
})

export default route