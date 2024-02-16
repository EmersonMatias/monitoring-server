import { Router, } from "express"
import { VigilantMiddleware } from "./vigilant.middleware.js"
import { VigilantController as Controller } from "./vigilant.controller.js"
import { Middlewares } from "../../middlewares/index.js"

const route = Router()

//* CRIAR VIGILANTE
route.post(
    "/vigilants",
    VigilantMiddleware.createVigilantBody,
    Controller.create
)

//* EDITAR VIGILANTE
route.put(
    "/vigilants/:id",
    Middlewares.ParamIDValidation,
    VigilantMiddleware.updateVigilantBody,
    Controller.update
)

//* ENCONTRAR TODOS OS VIGILANTES
route.get(
    "/vigilants",
    Controller.findMany
)

//* ENCONTRAR UM VIGILANTE ATRAVÉS ID
route.get(
    "/vigilants/:id",
    Middlewares.ParamIDValidation,
    Controller.findUnique
)

//* ENCONTRAR VIGILANTE ATRAVÉS DO ID E FILTRADO POR DATAS
route.get(
    "/vigilants/datefilter/:id",
    Middlewares.ParamIDValidation,
    Middlewares.QueryDatesValidation,
    Controller.findUniqueFilter
)

//* DELETAR VIGILANTE
route.delete(
    "/vigilants/:id",
    Middlewares.ParamIDValidation,
    Controller.deleteUnique
)

export default route

