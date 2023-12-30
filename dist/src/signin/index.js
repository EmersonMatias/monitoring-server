import { Router } from "express";
import { validateSigninData } from "./signin.middlewares.js";
import { connectUser } from "./signin.controller.js";
var route = Router();
route.post("/signin", validateSigninData, connectUser);
export default route;
