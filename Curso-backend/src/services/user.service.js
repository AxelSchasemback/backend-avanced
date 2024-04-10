import { userManager, cartManager } from '../dao/index.dao.js'
import { UserDto } from '../dto/userDto.js'
import { randomUUID } from "crypto";
import { comparePassword, decrypt, encrypt, hashPassword } from '../utils/cryptography.js';
import { emailServices } from './email.service.js';
import { resetPasswordEmail } from './configEmail/sendResetEmail.js';
export class SessionsService {
    constructor(dao) {
        this.dao = dao
    }

    async login(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Faltan credenciales');
            }
            const user = await userManager.findOne({ email });

            if (!user) {
                throw new Error('Correo electrónico no encontrado');
            }

            const isPasswordValid = await comparePassword(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Contraseña Inconrrecta');
            }

            return user
        } catch (error) {
            throw new Error('Error de autenticación: ' + error.message);
        }
    }

    async cartId() {
        return await cartManager.createCart(randomUUID())
    }

    async register(name, email, password, date, sex) {
        try {
            const userExist = await userManager.findOne({ email });
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!passwordRegex.test(password)) {
                throw new Error('La contraseña no cumple con los requisitos');
            }

            if (userExist) {
                throw new Error('El usuario Ya existe')
            }
            if (!name || !email || !password) {
                throw new Error(' faltan credenciales');
            }

            const hasPassword = await hashPassword(password)

            const newUser = {
                _id: randomUUID(),
                name: name,
                date: date,
                sex: sex,
                email: email,
                password: hasPassword,
                cartId: await this.cartId(),
                orders: []
            };

            const user = await userManager.createUser(newUser);
            return user;

        } catch (error) {
            throw new Error('Error al registrar usuario: ' + error.message);
        }
    }

    async validate(email, pass) {
        try {
            const usuario = await userManager.findOne({ email });

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

    async sendTokenAuth(email) {
        try {
            const user = await userManager.findOne({ email });
            if (!user) {
                throw new Error('Error 401: Correo electrónico o contraseña incorrecta');
            }

            // Generar un token JWT con expiración de 1 hora
            const token = await encrypt(user)

            // Enviar correo electrónico con el enlace para restablecer la contraseña
            await emailServices.send(
                user.email,
                'Restablecimiento de contraseña',
                resetPasswordEmail(`http://localhost:8080/reset-password?token=${token}`)
            );

            return token

        } catch (error) {
            throw new Error('Error reset your password: ' + error)
        }
    }

    async resetPasswordAuth(token, newPassword) {
        try {
            const decoded = await decrypt(token)
            if (!decoded) {
                throw new Error('Error Token no especificado')
            }
            // @ts-ignore
            const user = await userManager.findId(decoded._id);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const hasPassword = await hashPassword(newPassword)

            const UpdateUser = await userManager.updateOne(user._id, { password: hasPassword });

            return UpdateUser
        } catch (error) {
            throw new Error('Error reset your password: ' + error)
        }
    }

};

export const sessionsService = new SessionsService(userManager);