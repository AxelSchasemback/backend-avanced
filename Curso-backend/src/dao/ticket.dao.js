import mongoose from 'mongoose';
import { randomUUID } from 'crypto'

const ticketSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true, default: randomUUID() },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

// ------------------------------------------------------

export class TicketDao {

    async createTicket(ticketData) {
        try {
            const ticket = await Ticket.create(ticketData);
            return ticket;
        } catch (error) {
            throw new Error('Error saving ticket');
        }
    }
}