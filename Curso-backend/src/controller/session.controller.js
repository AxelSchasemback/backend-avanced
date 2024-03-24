import passport from "passport";
import { appendJwtAsCookie, removeJwtFromCookies } from "../middlewares/passport.js";

export function loginUser(req, res, next) {
    passport.authenticate('local-login', {
        failWithError: true,
        failureRedirect: '/api/login'
    })(req, res, async function () {
            await appendJwtAsCookie(req, res, next)
                res.status(201).redirect('/api/products');
        
    });
}


export const currentUser = (req, res) => {
    passport.authenticate('jwt', {
        failWithError: true,
    })(req, res, function () {
        res.json({ status: 'success', payload: req.user });
    });
};

export function deleteCurrentUser(req, res, next) {
    (async function () {
        await removeJwtFromCookies(req, res, next),
            res.json({ status: 'success', message: 'logout OK' });
    })
}

export function getGithubCallback(req, res, next) {
    passport.authenticate('github-login', {
        failWithError: true
    })(req, res, next),
        appendJwtAsCookie(req, res)
    res.redirect('/profile');
};

export function logoutUser(req, res) {
    req.logout(error => {
        if (error) {
            throw new Error('error en el logout: ' + error)
        }
        res.redirect('/api/login');
    });
};
