import { Router } from "express";
import { githubCallback, githubLogin, passportRegister} from "../controller/user.controller.js";
import { usersOnly } from '../middlewares/authorization.js'
import { sendToken, userResetPassword } from "../controller/authentication.controller.js";

export const userRouter = Router()

userRouter.post('/register', passportRegister)

userRouter.post('/reset-password', sendToken, usersOnly)

userRouter.post('/reset-password/:token', userResetPassword, usersOnly)

userRouter.get('/githublogin', githubLogin, usersOnly)

userRouter.get('/githubcallback', githubCallback, usersOnly)