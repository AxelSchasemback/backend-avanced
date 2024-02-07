import { CartDao } from "./cart.dao.js";
import { ProductDao } from "./product.dao.js";
import { UserDao } from "./user.dao.js";
import { OrderDao } from "./orders.dao.js";

export const cartManager = new CartDao()
export const productManager = new ProductDao()
export const userManager = new UserDao()
export const orderManager = new OrderDao()