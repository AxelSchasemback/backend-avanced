import passport from "passport";
import { appendJwtAsCookie, removeJwtFromCookies } from "../middlewares/passport.js";
import { UserDto } from "../dto/userDto.js";

export function loginUser(req, res, next) {
    passport.authenticate('local-login', {
        failWithError: true
    })(req, res, async function (error) {
        try {
            if (error) {
                throw new Error('Failed: email or password is wrong');
            }
            await appendJwtAsCookie(req, res, next)
            const payload = new UserDto(req.user)
            res.json({ status: 'success', payload })
        } catch (error) {
            res.json({ status: 'failed', payload:'Failed: email or password is wrong' })
        }
    });
}


export const currentUser = (req, res, next) => {
    passport.authenticate('jwt', {
        failWithError: true,
    })(req, res, function () {
        if (!req.user) {
            return res.json({ status: 'failed', payload: 'unauthorized' });
        }
        const payload = new UserDto(req.user)
        res.json({ status: 'success', payload });
    });
};

export function deleteCurrentUser(req, res, next) {
    (async function () {
        await removeJwtFromCookies(req, res, next),
            res.json({ status: 'success', message: 'logout Ok' });
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
        res.redirect('/login')
    });
};