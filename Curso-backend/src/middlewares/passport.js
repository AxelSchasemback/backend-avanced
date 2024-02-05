import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const COOKIE_OPTS = { signed: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }

export async function appendJwtAsCookie(req, res, next) {
    try {
        const accessToken = await encrypt(req.user);
        res.cookie('authorization', accessToken, COOKIE_OPTS);
        next()
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export async function removeJwtFromCookies(req, res, next) {
    res.clearCookie('authorization', COOKIE_OPTS)
    next()
}

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
        let token = null
        if (req?.signedCookies) {
            token = req.signedCookies['authorization']
        }
        return token
    }]),
    secretOrKey: JWT_PRIVATE_KEY,
}, async function (jwtPayload, done) {
    try {
        const user = await decrypt(jwtPayload);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// -----------------------------------------------------------------

import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2"
import { gitHubCallBackUrl, gitHubClientSecre, gitHubClientId, JWT_PRIVATE_KEY } from "../config.js";
import { decrypt, encrypt } from "../utils/cryptography.js";
import { userLogin, userRegister, userReset, verefication } from "../controller/authentication.controller.js";

passport.use('github', new GitHubStrategy({
    clientID: gitHubClientId,
    clientSecret: gitHubClientSecre,
    callbackURL: gitHubCallBackUrl
}, verefication))

passport.use('local-register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
}, userRegister))

passport.use('local-login', new LocalStrategy({
    usernameField: 'email'
}, userLogin))

passport.use('local-reset', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
}, userReset))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function authenticate(req, res, next) {
    passportInitialize(req, res, () => {
        passportSession(req, res, next)
    })
}