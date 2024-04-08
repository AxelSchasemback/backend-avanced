import passport from "passport";
import { appendJwtAsCookie, removeJwtFromCookies } from "../middlewares/authentication.js";
import { UserDto } from "../dto/userDto.js";

export const loginUser = async (req, res, next) => {
    try {  
        await appendJwtAsCookie(req, res, next)
        const payload = new UserDto(req.user)
        res['successfullPost'](payload);
    } catch (error) {
        next(error);
    }
}

export const currentUser = (req, res, next) => {
    try {
        const payload = new UserDto(req.user)
        res['successfullGet'](payload);
    } catch (error) {
        next(error);
    }
};

export async function deleteCurrentUser(req, res, next) {
    try {
        removeJwtFromCookies
        res['successfullDelete']();
    } catch (error) {
        next(error);
    }
};

export function logoutUser(req, res, next) {
    try {
        res['successfullDelete']();
    } catch (error) {
        next(error);
    }
};

export function getGithubCallback(req, res, next) {
    passport.authenticate('github-login', {
        failWithError: true
    })(req, res, next),
        appendJwtAsCookie(req, res)
    res.redirect('/profile');
};