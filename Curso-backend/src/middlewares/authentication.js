import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2"
import { gitHubCallBackUrl, gitHubClientSecret, gitHubClientId } from "../config/config.js";
import { userLogin, userRegister, userReset, verification } from "../controller/authentication.controller.js";

passport.use('github', new GitHubStrategy({
    clientID: gitHubClientId,
    clientSecret: gitHubClientSecret,
    callbackURL: gitHubCallBackUrl
}, verification))

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