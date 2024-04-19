import { userManager } from "../dao/index.dao.js";
import { UserDto } from "../dto/userDto.js";
import { accountService } from "../services/account.service.js";

export const getUser = async (req, res) => {
    try {

        const id = req.params['id']

        const usuario = await userManager.findId(id)

        res.status(200).json(usuario)

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const usuario = await userManager.findMany()
        res.status(200).json(usuario)

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}

export const getDataUser = async (req, res) => {
    try {
        const user = req.user || null

        const usuario = await userManager.findOne({ email: user.email })

        res.status(200).json(usuario)
    } catch (error) {
        res.status(401).redirect('/login');
    }
}

export const postDescription = async (req, res) => {
    try {
        const user = req.user || null

        const updateDescription = await userManager.updateOne(user._id, { description: req.body.description })

        const payload = new UserDto(updateDescription)

        res.status(201).json(payload)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateUserAvatar(req, res, next) {
    try {
        const { email } = req.params
        const { filename, originalname, path } = req.file;

        const user = await userManager.findOne({ email })

        const updatedUser = await accountService.updateAvatarUser(user._id, email, originalname)

        res.status(201).json(updatedUser)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const putDataUser = async (req, res) => {
    try {
        const user = req.body;

        const updateUser = await userManager.updateOne(req.params['id'], user);

        const payload = new UserDto(updateUser)

        res.status(201).json(payload)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const delUser = async (req, res) => {
    try {
        const delUser = await userManager.deleteOne(req.params['id']);

        res.status(201).json({usuarioBorrado: delUser});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}