import { Router } from "express";
import { addToCart, cartInfo, deleteCart, getCart, updateCart, updateProductToCart } from "../controller/carts.controller.js";

export const CartsRouter = Router()

CartsRouter.post('/:idCarrito/products/:idProducto', addToCart);

CartsRouter.get('/:Cid/products/:Pid', getCart)

CartsRouter.get('/:Cid', cartInfo)

CartsRouter.put('/:Cid', updateCart)

CartsRouter.put('/:Cid/products/:Pid', updateProductToCart)

CartsRouter.delete('/:Cid', deleteCart)