import {  Router } from "express";
import { AgencyMiddleware } from "./agency.middleware.js";
import { AgencyController as Controller } from "./agency.controller.js";

const router = Router()

//* ROTA PRONTA
router.post("/agency", AgencyMiddleware.createAgencyBody, Controller.create)

//* ROTA PRONTA
router.get("/agency", Controller.findMany)







export default router