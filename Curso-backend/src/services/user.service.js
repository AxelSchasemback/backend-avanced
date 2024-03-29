// sessionsService.js

import { userManager, cartManager } from '../dao/index.dao.js'
import { UserDto } from '../dto/userDto.js'
import { randomUUID } from "crypto";
import { comparePassword, hashPassword } from '../utils/cryptography.js';

export class SessionsService {
    constructor(dao) {
        this.dao = dao
    }

    async login(email, password) {
        if (!email || !password) {
            throw new Error('Error de autenticación: Faltan credenciales');
        }

        try {
            const user = await userManager.getUserByEmail(email);

            if (!user) {
                throw new Error('Error de autenticación: Correo electrónico no encontrado');
            }

            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Error de autenticación: Contraseña incorrecta');
            }

            return user
        } catch (error) {
            throw new Error('Error de autenticación: ' + error.message);
        }
    }

    async cartId() {
        return await cartManager.createCart(randomUUID())
    }

    async register(reqBody) {
        if (!reqBody || !reqBody.name || !reqBody.email || !reqBody.password) {
            throw new Error('Error al registrar el usuario: faltan credenciales');
        }

        const newUser = {
            _id: randomUUID(),
            name: reqBody.name,
            date: reqBody.date,
            sex: reqBody.sex,
            email: reqBody.email,
            password: await hashPassword(reqBody.password),
            cartId: await this.cartId(),
            orders: []
        };

        const data = new UserDto(newUser);
        return data;
    }

    async validate(email, pass) {
        try {
            const usuario = await userManager.getUserByEmail(email);

            if (!usuario) {
                throw new Error('Error 401: Correo electrónico o contraseña incorrecta');
            }

            const contraseñaValida = await comparePassword(pass, usuario.password);

            if (!contraseñaValida) {
                throw new Error('Error 401: Correo electrónico o contraseña incorrecta');
            }

            return new UserDto(usuario);
        } catch (error) {
            throw new Error('Error de autenticación: ' + error.message);
        }
    }

}

export const sessionsService = new SessionsService(userManager);
