// authHandlers.js
import { sessionsService } from "../services/user.service.js";
import { userManager } from "../dao/index.dao.js";
import { UserDto } from "../dto/userDto.js";
import { logger } from "../utils/logger.js";

export const verification = async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userManager.getUserByEmail({ email: profile.username });
        
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
        const user = await sessionsService.register(req.body);
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
        done(null, false, logger.error(error.message));
    }
};

export const userReset = async (req, email, password, done) => {
    try {
        await sessionsService.validate(email, password);

        const usuario = await userManager.getUserByEmail({ email });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Actualizar la contraseña
        const updatedUser = await userManager.updateUser(usuario._id, { password: req.body.reset });

        const dataUser = new UserDto(updatedUser);

        done(null, dataUser);
    } catch (error) {
        done(null, false, console.error(error));
    }
};
