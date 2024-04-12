import { Router } from "express"
import { getUser, getAllUser, getDataUser, postDescription, putDataUser, delUser } from "../controller/account.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/authorization.js";

export const accountRouter = Router()

accountRouter.get('/user/:id', getUser, adminsOnly)

accountRouter.put('/user/:id', putDataUser, adminsOnly)

accountRouter.delete('user/:id', delUser, adminsOnly)

accountRouter.get('/users', getAllUser, adminsOnly)

accountRouter.get('/', getDataUser, adminsOnly)

accountRouter.post('/', postDescription, usersOnly)