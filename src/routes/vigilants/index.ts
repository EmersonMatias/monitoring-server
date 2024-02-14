import { Router, } from "express"
import { VigilantMiddleware } from "./vigilant.middleware.js"
import { VigilantController as Controller } from "./vigilant.controller.js"
import { Middlewares } from "../../middlewares/index.js"

const route = Router()

//* ROTA PRONTA - CRIA VIGILANTE
route.post("/vigilants", VigilantMiddleware.createVigilantBody, Controller.create)

//* ROTA PRONTA
route.put("/vigilants/:id", Middlewares.ParamIDValidation, VigilantMiddleware.updateVigilantBody, Controller.update)

route.get("/vigilants", Controller.findMany)

//* ROTA PRONTA
route.get("/vigilants/:id",  Middlewares.ParamIDValidation, Controller.findUnique)

//* ROTA PRONTA
route.delete("/vigilants/:id",  Middlewares.ParamIDValidation, Controller.deleteUnique)

export default route

