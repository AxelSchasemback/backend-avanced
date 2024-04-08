import passport from "passport";
import { appendJwtAsCookie } from "../middlewares/authentication.js";
import { UserDto } from "../dto/userDto.js";

export const passportRegister = async (req, res, next) => {
    try {
            await appendJwtAsCookie(req, res, next);
            const payload = new UserDto(req.user)
            res['successfullPost'](payload);
    } catch (error) {
        next(error, error)
    }
}

export const passportReset = async (req, res, next) => {
    try {
        await appendJwtAsCookie(req, res, next),
            res['successfullPost'](req.user);
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