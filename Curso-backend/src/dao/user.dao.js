// @ts-nocheck
import mongoose from "mongoose";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 8 caracteres, una mayúscula y un número

const schemaUser = new mongoose.Schema(
  {
    _id: { type: String, default: randomUUID(), required: true },
    name: { type: String, required: true, minlength: 2 }, // Mínimo 2 caracteres para el nombre
    date: { type: String },
    sex: { type: String },
    description: { type: String, default: '' },
    email: { type: String, required: true },
    password: {
      type: String, required: true, validate: {
        validator: value => passwordRegex.test(value), message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número'
      }
    },
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

export const User = mongoose.model('users', schemaUser);

// ----------------------------------------

export class UserDao {
  async getUser() {
    return await User.find().lean()
  };

  async getUserByData(data) {
    return await User.findOne({ data }).lean()
  }

  async getUserById(id) {
    const searchUser = await User.findById(id).lean()
    if (!searchUser) {
      throw new Error('error al buscar: usuario no encontrado')
    }
    return searchUser
  };

  async getUserByEmail(email) {
    const searchEmail = await User.findOne({email}).lean()
    if (!searchEmail) {
      throw new Error('error al buscar: email de usuario no encontrado')
    }
    return searchEmail
  }

  async updateUser(id, update) {
    const updateUser = await User.findByIdAndUpdate(id, { $set: update }, { new: true }).lean()
    if (!updateUser) {
      throw new Error('error al actualizar: usuario no encontrado')
    }
    return updateUser
  }

  async delUser(id) {
    const deleteUser = await User.findByIdAndDelete(id).lean()
    if (!deleteUser) {
      throw new Error('error al borrar: usuario no encontrado')
    }
    return deleteUser
  }
}
