import passport from "passport";
import { decrypt, encrypt } from "../utils/cryptography.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { JWT_PRIVATE_KEY } from "../config/config.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2"
import { gitHubCallBackUrl, gitHubClientSecret, gitHubClientId } from "../config/config.js";
import { userLogin, userRegister, userResetPassword, verification } from "../controller/authentication.controller.js";

passport.use('github', new GitHubStrategy({
    clientID: gitHubClientId,
    clientSecret: gitHubClientSecret,
    callbackURL: gitHubCallBackUrl
}, verification))

passport.use("local-register", new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, userRegister));

passport.use('local-login', new LocalStrategy({ passwordField: 'password', usernameField: 'email' }, userLogin));

passport.use('local-reset', new LocalStrategy({ passReqToCallback: true, usernameField: 'token', passwordField: 'newPassword' }, userResetPassword))

const COOKIE_OPTS = { signed: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }

export async function appendJwtAsCookie(req, res, next) {
    try {
        const accessToken = await encrypt(req.user);
        res.cookie('authorization', accessToken, COOKIE_OPTS);
        next()
    } catch (error) {
        next(error);
    }
}

export async function removeJwtFromCookies(req, res, next) {
    res.clearCookie('authorization', COOKIE_OPTS)
    next()
}

passport.use('jwtAuth', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
        let token = null
        if (req?.signedCookies) {
            token = req.signedCookies['authorization']
        }
        return token
    }]),
    secretOrKey: JWT_PRIVATE_KEY,
}, (user, done) => {
    done(null, user)
}))

passport.serializeUser((user, next) => { next(null, user); });
passport.deserializeUser((user, next) => { next(null, user); });

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();