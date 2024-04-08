// @ts-nocheck
import mongoose from "mongoose";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import lastConnectionMiddleware from "../middlewares/last-conection.js";

const schemaUser = new mongoose.Schema(
  {
    _id: { type: String, default: randomUUID(), required: true },
    name: { type: String, required: true, minlength: 2 }, // Mínimo 2 caracteres para el nombre
    date: { type: String },
    sex: { type: String },
    description: { type: String, default: '' },
    email: { type: String, required: true },
    password: {type: String, required: true},
    rol: { type: String, default: 'user', required: true },
    cartId: { type: String, ref: 'carts' },
    orders: [{ type: String, ref: 'Orders' }],
    documents: [{ name: String, reference: String }],
    last_connection: { type: Date, default: null }
  },
  {
    versionKey: false,
    strict: 'throw',
  }
);

schemaUser.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schemaUser.plugin(lastConnectionMiddleware);

export const User = mongoose.model('users', schemaUser);

// ----------------------------------------

export class UserDao {
  async createUser(data) {
    const user = await User.create(data)
    return user.toObject();
  }

  async findMany(criteria) {
    return await User.find(criteria).lean()
  };

  async findId(id) {
    return await User.findById(id).lean()
  }

  async findOne(criteria) {
    return await User.findOne(criteria).lean()
  }

  async updateOne(id, update) {
    const updateUser = await User.findByIdAndUpdate(id, { $set: update }, { new: true }).lean()
    if (!updateUser) {
      throw new Error('error al actualizar: usuario no encontrado')
    }
    return updateUser
  }

  async deleteOne(id) {
    const deleteUser = await User.findByIdAndDelete(id).lean()
    if (!deleteUser) {
      throw new Error('error al borrar: usuario no encontrado')
    }
    return deleteUser
  }
}
