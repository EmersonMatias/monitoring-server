import { Router } from "express";
import { StatusController as Controller } from "./status.controller.js";
import { Middlewares } from "../../middlewares/index.js";
import { StatusMiddleware } from "./status.middleware.js";

const route = Router()

route.get(
    '/status',
    Controller.findMany
)

route.get(
    '/status/:id',
    Middlewares.ParamIDValidation,
    Controller.findUnique
)

route.put(
    '/status/:id',
    Middlewares.ParamIDValidation,
    StatusMiddleware.UpdateBodyValidate,
    Controller.update
)


export default route