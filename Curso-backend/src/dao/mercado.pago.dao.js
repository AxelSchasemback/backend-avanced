import mongoose from "mongoose";

const Order = new mongoose.Schema({
    code: { type: String, unique: true, required: true, default: randomUUID() },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
}, {
    versionKey: false,
    strict: 'throw',
    _id: false
})

export const order = mongoose.model("Orders", Order);

// ------------------------------------------------------
