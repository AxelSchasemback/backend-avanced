import { Router } from "express";
import { passportLocalRegister, sessionAuth } from "../middlewares/passport.js";
import { githubCallback, githubLogin, passportRegister} from "../controller/user.controller.js";
import { usersOnly } from '../middlewares/authorization.js'
import { sendToken, userResetPassword } from "../controller/authentication.controller.js";

export const userRouter = Router()

userRouter.post('/register', passportLocalRegister, passportRegister)

userRouter.post('/reset-password', sendToken, usersOnly)

userRouter.post('/reset-password/:token', userResetPassword)

userRouter.get('/githublogin', githubLogin)

userRouter.get('/githubcallback', githubCallback)