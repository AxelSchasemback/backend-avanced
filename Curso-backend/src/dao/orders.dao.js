import mongoose from 'mongoose';
import { randomUUID } from 'crypto'

const Order = new mongoose.Schema({
    _id: { type: String, require: true, default: randomUUID() },
    code: { type: String, unique: true, require: true },
    purchase_datetime: { type: Date },
    email: { type: String, require: true },
    ref: { type: String, require: true },
    products:
        [{
            product: { type: String, ref: "products" },
            quantity: { type: Number }
        }],
    price: { type: Number, required: true },
}, {
    versionKey: false,
    strict: 'throw',
    _id: false
})

export const order = mongoose.model("Orders", Order);

// ------------------------------------------------------

export class OrderDao {

    async createOrder(user, ref, products, price) {
        try {
            const orders = await order.create({
                _id: randomUUID(),
                code: Math.random().toString(16).slice(2).substr(0, 15),
                purchase_datetime: Date.now(),
                email: user,
                ref: ref,
                products: products,
                price: price,
            });
            return orders.toObject()
        } catch (error) {
            throw new Error('Error al crear Ticket');
        }
    }

    async getOrder() {
        return await order.find().lean()
    };

    async getOrderById(id) {
        const searchOrder = await order.findById(id).lean()
        if (!searchOrder) {
            throw new new Error('error al buscar: orden no encontrada')
        }
        return searchOrder
    };

    async updateOrder(id, update) {
        const updateOrder = await order.findByIdAndUpdate(id, { $set: update }, { new: true }).lean()
        if (!updateOrder) {
            throw new new Error('error al actualizar: orden no encontrada')
        }
        return updateOrder
    }

    async delOrder(id) {
        const deleteOrder = await order.findByIdAndDelete(id).lean()
        if (!deleteOrder) {
            throw new new Error('error al borrar: orden no encontrada')
        }
        return deleteOrder
    }
}