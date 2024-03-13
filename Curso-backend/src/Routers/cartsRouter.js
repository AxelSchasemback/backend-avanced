import { Router } from "express";
import { getAllCarts, addToCart, cartInfo, deleteCart, getCart, updateCart, resetCart} from "../controller/carts.controller.js";
import { createOrder } from "../controller/order.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/auth.js";

export const CartsRouter = Router()

CartsRouter.get('/', getAllCarts, adminsOnly)

CartsRouter.get('/:Cid',  getCart, usersOnly)

CartsRouter.put('/:Cid', updateCart, adminsOnly)

CartsRouter.delete('/:Cid', deleteCart, adminsOnly)

CartsRouter.get('/:Cid/products/:Pid',   cartInfo, usersOnly)

CartsRouter.post('/:idCarrito/products/:idProducto', addToCart, usersOnly);

CartsRouter.get('/:Cid/purchase',  cartInfo, usersOnly )

CartsRouter.post('/:Cid/reset', resetCart, usersOnly)

CartsRouter.post('/payment', createOrder, usersOnly)