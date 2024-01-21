import { Router } from "express";
import { currentUser, githubCallback, githubLogin, passportRegister, passportReset } from "../controller/user.controller.js";

export const userRouter = Router()

userRouter.post('/register', passportRegister)

userRouter.post('/reset', passportReset)
   

userRouter.get('/current', currentUser)


userRouter.get('/githublogin',githubLogin)

userRouter.get('/githubcallback', githubCallback)