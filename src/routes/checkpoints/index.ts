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

route.post(
    "/checkpoints/:id",
    Middlewares.ParamIDValidation,
    CheckpointsMiddleware.createCheckpointBody,
    CheckpointsController.create
)

export default route
