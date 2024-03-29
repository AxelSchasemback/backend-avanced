import passport from "passport";
import { decrypt, encrypt } from "../utils/cryptography.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { JWT_PRIVATE_KEY } from "../config/config.js";

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