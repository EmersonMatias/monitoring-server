import { Router } from "express"
import { CheckpointsController, CheckpointsController as Controller } from "./checkpoints.controller.js"
import { Middlewares } from "../../middlewares/index.js"
import { CheckpointsMiddleware } from "./checkpoints.middleware.js"

const route = Router()


route.get(
    "/checkpoints",
    Middlewares.QueryDateValidation,
    Controller.findMany
)

//id = userId
route.get(
    '/checkpoints/:id/:date',
    Middlewares.ParamIDValidation,
    Middlewares.ParamDateValidation,
    Controller.findUnique
)

route.post(
    "/checkpoints/:id",
    Middlewares.ParamIDValidation,
    Middlewares.BodyDateValidation,
    CheckpointsController.create
)

route.put('/checkpoints/:id',
    Middlewares.ParamIDValidation,
    Middlewares.BodyDateValidation,
    CheckpointsController.update
)

export default route
