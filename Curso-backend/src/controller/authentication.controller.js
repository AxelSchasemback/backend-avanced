// authHandlers.js
import { sessionsService } from "../services/user.service.js";
import { userManager } from "../dao/index.dao.js";
import { UserDto } from "../dto/userDto.js";
import { logger } from "../utils/logger.js";

export const verification = async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userManager.findOne({ email: profile.username });

        if (user) {
            return done(null, new UserDto(user));
        } else {
            const registerUser = await sessionsService.register({
                email: profile.username,
                password: '(nulo)',
                name: profile.displayName,
                cartId: await sessionsService.cartId()
            });

            return done(null, new UserDto(registerUser));
        }
    } catch (error) {
        return done(error);
    }
};

export const userRegister = async (req, _u, _p, done) => {
    try {
        const { name, email, password, date, sex } = req.body

        const user = await sessionsService.register(name, email, password, date, sex);
        
        done(null, user);
    } catch (error) {
        done(null, false, logger.error(error));
    }
};

export const userLogin = async (email, password, done) => {
    try {
        const user = await sessionsService.login(email, password);
        done(null, user);
    } catch (error) {
        done(null, false, logger.error(error));
    }
};

export const sendToken = async (req, res) => {
    try {
        console.log(req.body.email)
        const sendToken = await sessionsService.sendTokenAuth(req.body.email)
        res.json(sendToken)
    } catch (error) {
        res.status(400).json({ status: 'failed', message: 'error al crear token' })
    }
}

export const userResetPassword = async (req, done) => {
    try {

        const token2 = req.params.token

        const { newPassword, token } = req.body


        const usuario = await sessionsService.resetPasswordAuth(token)

        // Actualizar la contraseña
        const updatedUser = await userManager.updateOne(usuario._id, { password: newPassword });

        const loginUser = await sessionsService.login(updatedUser.email, updatedUser.password);

        done(null, loginUser);
    } catch (error) {
        done(null, false, console.error(error));
    }
};
