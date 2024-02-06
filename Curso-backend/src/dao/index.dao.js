import { CartManagerMongo } from "./cart.dao.js";
import { ProductManagerMongo } from "./product.dao.js";
import { UserDao } from "./user.dao.js";
import { OrderDao } from "./orders.dao.js";

export const cm = new CartManagerMongo()
export const pm = new ProductManagerMongo()
export const us = new UserDao()
export const or = new OrderDao()