import { Router } from "express";
import { addToCart, cartInfo, deleteCart, getCart, updateCart, updateProductToCart } from "../controller/carts.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/auth.js";

export const CartsRouter = Router()

CartsRouter.post('/:idCarrito/products/:idProducto', addToCart, usersOnly);

CartsRouter.get('/:Cid/products/:Pid', getCart, usersOnly)

CartsRouter.get('/:Cid', cartInfo, usersOnly)

CartsRouter.put('/:Cid', updateCart, adminsOnly)

CartsRouter.put('/:Cid/products/:Pid', updateProductToCart, adminsOnly)

CartsRouter.delete('/:Cid', deleteCart, adminsOnly)