import { Router } from "express";
import { addToCart, cartInfo, deleteCart, getCart, updateCart, updateProductToCart, resetCart} from "../controller/carts.controller.js";
import { createOrder } from "../controller/order.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/auth.js";

export const CartsRouter = Router()

CartsRouter.post('/:idCarrito/products/:idProducto', addToCart, usersOnly);

CartsRouter.get('/:Cid/products/:Pid', getCart, usersOnly)

CartsRouter.get('/:Cid', cartInfo, usersOnly)

CartsRouter.get('/:Cid/purchase', cartInfo, usersOnly )

CartsRouter.post('/payment', createOrder, usersOnly)

CartsRouter.post('/:Cid/reset', resetCart, usersOnly)

CartsRouter.put('/:Cid', updateCart, usersOnly)

CartsRouter.put('/:Cid/products/:Pid', updateProductToCart, adminsOnly)

CartsRouter.delete('/:Cid', deleteCart, adminsOnly)