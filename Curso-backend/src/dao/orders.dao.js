import mongoose from 'mongoose';
import { randomUUID } from 'crypto'

const Order = new mongoose.Schema({
    _id: { type: String, require: true, default: randomUUID() },
    code: { type: String, unique: true, require: true },
    purchase_datetime: { type: Date },
    email: { type: String, require: true },
    ref: { type: String, require: true },
    status: { type: String, required: true, default: "PENDING"},
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

    /**
     * @param {string} user
     * @param {string} ref
     * @param {string} status
     * @param {Array} products
     * @param {Number} price
     */
    async createOrder(user, ref, status, products, price) {
        try {
            const orders = await order.create({
                _id: randomUUID(),
                code: Math.random().toString(16).slice(2).substr(0, 15),
                purchase_datetime: Date.now(),
                email: user,
                ref: ref,
                status: status,
                products: products,
                price: price,
            });
            return orders.toObject()
        } catch (error) {
            throw new Error('Error al crear Ticket');
        }
    }

    async findMany(criteria) {
        return await order.find(criteria).lean()
    };

    /**
     * @param {string} id
     */
    async findOne(id) {
        const searchOrder = await order.findById(id).lean()
        if (!searchOrder) {
            throw new Error('error al buscar: orden no encontrada')
        }
        return searchOrder
    };

    /**
     * @param {string} id
     * @param {any} update
     */
    async updateOne(id, update) {
        const updateOrder = await order.findByIdAndUpdate(id, { $set: update }, { new: true }).lean()
        if (!updateOrder) {
            throw new Error('error al actualizar: orden no encontrada')
        }
        return updateOrder
    }

    /**
     * @param {string} id
     */
    async deleteOne(id) {
        const deleteOrder = await order.findByIdAndDelete(id).lean()
        if (!deleteOrder) {
            throw new Error('error al borrar: orden no encontrada')
        }
        return deleteOrder
    }
}