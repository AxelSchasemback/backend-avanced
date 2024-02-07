import { Router } from "express";
import { getProduct, getById, createProduct, updateProduct, deleteProduct } from "../controller/products.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/auth.js";

export const productsRouter = Router()

productsRouter.get('/', getProduct)

productsRouter.get('/:id', getById, usersOnly)

productsRouter.post('/', createProduct, usersOnly)

productsRouter.put('/:id', updateProduct, adminsOnly)

productsRouter.delete('/:id', deleteProduct, adminsOnly)