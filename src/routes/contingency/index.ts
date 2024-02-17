import { Router } from "express";
import { Middlewares } from "../../middlewares/index.js";
import { ContingencyMiddleware as Validate } from "./contingency.middleware.js";
import { ContingencyController as Controller } from "./contingency.controller.js";
 
const route = Router()

route.post(
    '/contingency/:id',
    Middlewares.ParamIDValidation,
    Validate.UpdateContingencyBody,
    Controller.update
)

route.get(
    '/contingency',
    Controller.findMany
)

route.get(
    '/contingency/:id',
    Middlewares.ParamIDValidation,
    Controller.findUnique
)

export default route