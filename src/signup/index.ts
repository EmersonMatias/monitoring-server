import { Router } from "express"
import { validateSignUpData } from "./signup.middleware.js"
import { registerVigilant } from "./signup.controller.js"


const route = Router()

route.post("/cadastrar", validateSignUpData, registerVigilant)


export default route