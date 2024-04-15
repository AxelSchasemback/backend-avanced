import { userManager } from "../dao/index.dao.js";
import { randomUUID } from "crypto";
import { UserDto } from "../dto/userDto.js";



export class AccountService {
    constructor(dao) {
        this.dao = dao
    }
    async updateAvatarUser(userId, email, originalname) {
        try {

            const updatedUser = await userManager.updateOne(userId, {
                documents: [{
                    _id: randomUUID(),
                    user_email: email,
                    title: originalname,
                }]
            })

            if (!updatedUser) {
                throw new Error('Error al cargar img')
            }

            return new UserDto(updatedUser)
        } catch (error) {
            throw new Error('Error al subir el archivo: ' + error.message)
        }
    }
};

export const accountService = new AccountService(userManager);