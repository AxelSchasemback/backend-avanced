import { Router } from "express";
import { getProduct, getsProducts, getById, createProduct, updateProduct, deleteProduct } from "../controller/products.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/authorization.js";

export const productsRouter = Router()

productsRouter.get('/', getProduct )

productsRouter.get('/all-products', getsProducts, adminsOnly)

productsRouter.get('/:id', getById, usersOnly)

productsRouter.post('/', createProduct, usersOnly)

productsRouter.put('/:id', updateProduct, adminsOnly)

productsRouter.delete('/:id', deleteProduct, adminsOnly)