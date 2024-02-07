import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
});

export const Chat = mongoose.model('chats', chatSchema);


//-------------------------------------------------------------------------------------

export class ChatDao {
    async saveMessage(user, message) {
        try {
            const dataChat = await Chat.create({
                user: user,
                message: message,
            });

            return dataChat;
        } catch (error) {
            throw error;
        }
    }
}