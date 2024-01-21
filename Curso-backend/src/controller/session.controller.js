import passport from "passport";
import { appendJwtAsCookie, removeJwtFromCookies } from "../middlewares/passport.js";


export const loginUser = () => {
    passport.authenticate('local-login', {
        failWithError: true
    }),
        appendJwtAsCookie,
        async function (req, res) {
            res.status(201).redirect('/api/products')
        }
}

export const getCurrentUser = () => {
    passport.authenticate('jwt', {
        failWithError: true
    }),
        function (req, res) { return res.json(req.user) }
}

export const deleteCurrentUser = () => {
    removeJwtFromCookies,
        (req, res) => {
            res.json({ status: 'success', message: 'logout OK' })
        }
}

export const getGithubCallback = () => {
    passport.authenticate('github-login', {
        failWithError: true
    }),
        appendJwtAsCookie,
        (req, res) => { res.redirect('/profile') },
        (error, req, res, next) => { res.redirect('/login') }
}

export const logoutUser = () => {
    req.logout(error => {
        if (error) {
            console.log(error)
        }
        res.redirect('/api/login')
    })
}