import {  Router } from "express";
import { AgencyMiddleware } from "./agency.middleware.js";
import { AgencyController as Controller } from "./agency.controller.js";
import { Middlewares } from "../../middlewares/index.js";

const router = Router()

//* ROTA PRONTA
router.post("/agency", AgencyMiddleware.createAgencyBody, Controller.create)

//* ROTA PRONTA
router.get("/agency", Controller.findMany)

router.get(
    "/agency/datefilter/:id",
    Middlewares.ParamIDValidation,
    Middlewares.QueryDatesValidation,
    Controller.findUniqueFilter
)








export default router