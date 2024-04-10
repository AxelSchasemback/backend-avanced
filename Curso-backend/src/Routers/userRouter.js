import { Router } from "express";
import { passportLocalRegister, passportLocalReset, sessionAuth } from "../middlewares/passport.js";
import { githubCallback, githubLogin, passportRegister, passportReset, sendToken} from "../controller/user.controller.js";

export const userRouter = Router()

userRouter.post('/register', passportLocalRegister, passportRegister)

userRouter.post('/reset-password', sendToken)

userRouter.post('/reset-password/:token', passportLocalReset, passportReset)

userRouter.get('/githublogin', githubLogin)

userRouter.get('/githubcallback', githubCallback)