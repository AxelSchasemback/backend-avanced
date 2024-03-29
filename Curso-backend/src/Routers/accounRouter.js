import { Router } from "express"
import { getUser, getAllUser, getDataUser, postDescription } from "../controller/account.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/authorization.js";

export const accountRouter = Router()

accountRouter.get('/user/:id', getUser, adminsOnly)

accountRouter.get('/user', getAllUser, adminsOnly)

accountRouter.get('/', getDataUser, usersOnly)

accountRouter.post('/', postDescription, usersOnly)