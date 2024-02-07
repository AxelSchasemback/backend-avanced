import passport from "passport";
import { appendJwtAsCookie } from "../middlewares/passport.js";

export const passportRegister = (req, res, next) => {
    passport.authenticate('local-register', {
        failWithError: true
    })(req, res, async function () {
        await appendJwtAsCookie(req, res, next),
            res.status(201).redirect('/api/products');
    });
}

export const passportReset = () => {
    passport.authenticate('local-reset', {
        failWithError: true
    }),
        async function (req, res) {
            res.status(201).redirect('/api/login')
        }
}


export const githubLogin = () => {
    passport.authenticate('github', { scope: ['user: email'] })
}

export const githubCallback = () => {
    passport.authenticate('github', {
        successRedirect: '/api/products',
        failureRedirect: '/api/login'
    })
}