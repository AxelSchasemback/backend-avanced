import { Router } from "express";
import { getAllCarts, addToCart, cartInfo, deleteCart, deleteProdCart, getCart, updateCart, updatedQuantity, resetCart} from "../../controller/carts.controller.js";
import { hasPermission} from "../../middlewares/authorization.js";

export const CartsRouter = Router()

CartsRouter.get('/', getAllCarts, hasPermission('admin'))

CartsRouter.get('/:Cid', getCart, hasPermission('admin'))

CartsRouter.put('/:Cid', updateCart, hasPermission('admin'))

CartsRouter.put('/:Cid/products/:Pid', updatedQuantity, hasPermission('admin'))

CartsRouter.delete('/:Cid/products/:Pid', deleteProdCart, hasPermission('admin') )

CartsRouter.delete('/:Cid', deleteCart, hasPermission('admin'))

CartsRouter.post('/:idCarrito/products/:idProducto', addToCart, hasPermission('admin'));

CartsRouter.get('/:Cid/populate', cartInfo, hasPermission('admin') )

CartsRouter.post('/:Cid/reset', resetCart, hasPermission('admin'))