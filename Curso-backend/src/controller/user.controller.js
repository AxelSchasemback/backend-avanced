import passport from "passport";
import { appendJwtAsCookie } from "../middlewares/authentication.js";
import { UserDto } from "../dto/userDto.js";
import { sessionsService } from "../services/user.service.js";

export const passportRegister = async (req, res, next) => {
    try {
        await appendJwtAsCookie(req, res, next);
        const payload = new UserDto(req.user)
        res['successfullPost'](payload);
    } catch (error) {
        next(error, error)
    }
}

export const sendToken = async (req, res) => {
    try {
        const sendToken = await sessionsService.sendTokenAuth(req.body.email)
        res.json(sendToken)
    } catch (error) {
        res.status(400).json({ status: 'failed', message: 'error al crear token' })
    }
}

export const passportReset = async (req, res, next) => {
    try {
        await appendJwtAsCookie(req, res, next);
        const payload = new UserDto(req.user);
        res['successfullPost'](payload);
    } catch (error) {
        next(error);
    }
}

export const githubLogin = () => {
    passport.authenticate('github', { scope: ['user: email'] })
}

export const githubCallback = () => {
    passport.authenticate('github', {
        successRedirect: '/products',
        failureRedirect: '/login'
    })
}