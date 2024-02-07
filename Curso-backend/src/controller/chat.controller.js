import { chatDao } from "../dao/index.js";


export const chatController = async (req, res) => {
    try {
        const { user, message } = req.body;
        const dataChat = await chatDao.saveMessage(user, message);
        res.json(dataChat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al enviar el mensaje" });
    }

}