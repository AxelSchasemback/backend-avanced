import passport from "passport";
import { appendJwtAsCookie } from "../middlewares/passport.js";
import { UserDto } from "../dto/userDto.js";

export const passportRegister = (req, res, next) => {
    passport.authenticate('local-register', {
        failWithError: true
    })(req, res, async function () {
        await appendJwtAsCookie(req, res, next)
        const payload = new UserDto(req.user)
        res.status(201).json({ status: 'success', payload })
    });
}

export const passportReset = (req, res) => {
    passport.authenticate('local-reset', {
        failWithError: true
    })(req, res, function () {
        const payload = new UserDto(req.user)
        res.status(201).json({ status: 'success', payload })
    })
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