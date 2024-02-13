import { Router } from "express"
import { getDataUser, postDescription } from "../controller/account.controller.js";
import { usersOnly } from "../middlewares/auth.js";

export const accountRouter = Router()

accountRouter.get('/', getDataUser, usersOnly)

accountRouter.post('/', postDescription, usersOnly)