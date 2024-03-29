import { Router } from "express";
import { githubCallback, githubLogin, passportRegister, passportReset } from "../controller/user.controller.js";
import { usersOnly } from '../middlewares/authorization.js'

export const userRouter = Router()

userRouter.post('/register', passportRegister)

userRouter.post('/reset', passportReset, usersOnly)
   
userRouter.get('/githublogin',githubLogin, usersOnly)

userRouter.get('/githubcallback', githubCallback, usersOnly)