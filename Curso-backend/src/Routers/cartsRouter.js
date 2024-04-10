import { Router } from "express";
import { getAllCarts, addToCart, cartInfo, deleteCart, deleteProdCart, getCart, updateCart, updatedQuantity, resetCart} from "../controller/carts.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/authorization.js";

export const CartsRouter = Router()

CartsRouter.get('/', getAllCarts, adminsOnly)

CartsRouter.get('/:Cid', getCart, usersOnly)

CartsRouter.put('/:Cid', updateCart, adminsOnly)

CartsRouter.put('/:Cid/products/:Pid', updatedQuantity, adminsOnly)

CartsRouter.delete('/:Cid/products/:Pid', deleteProdCart, adminsOnly )

CartsRouter.delete('/:Cid', deleteCart, adminsOnly)

CartsRouter.post('/:idCarrito/products/:idProducto', addToCart, adminsOnly);

CartsRouter.get('/:Cid/populate', cartInfo, adminsOnly )

CartsRouter.post('/:Cid/reset', resetCart, adminsOnly)