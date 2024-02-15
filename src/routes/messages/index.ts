import { Router } from "express";
import { MessagesMiddlewares as Validate } from "./messages.middleware.js";
import { MessagesController as Controller } from "./messages.controller.js";
import { Middlewares } from "../../middlewares/index.js";


const route = Router()

route.get(
    '/messages',
    Middlewares.QueryDatesValidation,
    Controller.findMany
)

route.post(
    '/messages',
    Validate.CreateMessageBody,
    Controller.create
)

route.put(
    '/messages/:id',
    Middlewares.ParamIDValidation,
    Validate.UpdateMessageBody,
    Controller.update
)




export default route