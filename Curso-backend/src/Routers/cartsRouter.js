import { Router } from "express";
import { getAllCarts, addToCart, cartInfo, deleteCart, getCart, updateCart, updateProductToCart, resetCart} from "../controller/carts.controller.js";
import { createOrder } from "../controller/order.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/auth.js";
import { gzipMiddleware } from "../middlewares/middle-gzip.js";

export const CartsRouter = Router()

CartsRouter.get('/', getAllCarts, adminsOnly)

CartsRouter.post('/:idCarrito/products/:idProducto', addToCart, usersOnly);

CartsRouter.get('/:Cid/products/:Pid', gzipMiddleware,  getCart, usersOnly)

CartsRouter.get('/:Cid', gzipMiddleware, cartInfo, usersOnly)

CartsRouter.get('/:Cid/purchase', gzipMiddleware, cartInfo, usersOnly )

CartsRouter.post('/payment', createOrder, usersOnly)

CartsRouter.post('/:Cid/reset', resetCart, usersOnly)

CartsRouter.put('/:Cid', updateCart, adminsOnly)

CartsRouter.put('/:Cid/products/:Pid', updateProductToCart, adminsOnly)

CartsRouter.delete('/:Cid', deleteCart, adminsOnly)