import { Router } from "express"
import { getDataUser, postDescription } from "../controller/account.controller.js";

export const accountRouter = Router()

accountRouter.get('/', getDataUser)

accountRouter.post('/', postDescription)