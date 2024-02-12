import { Router } from "express";
import { githubCallback, githubLogin, passportRegister, passportReset } from "../controller/user.controller.js";
import { usersOnly } from '../middlewares/auth.js'
import { authenticate } from "../middlewares/passport.js";

export const userRouter = Router()

userRouter.post('/register', passportRegister, usersOnly, authenticate)

userRouter.post('/reset', passportReset, usersOnly, authenticate)
   
userRouter.get('/githublogin',githubLogin, usersOnly)

userRouter.get('/githubcallback', githubCallback, usersOnly)