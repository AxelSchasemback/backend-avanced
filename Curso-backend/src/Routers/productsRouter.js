import { Router } from "express";
import { getProduct, getsProducts, getById, createProduct, updateProduct, deleteProduct } from "../controller/products.controller.js";
import { usersOnly, adminsOnly } from "../middlewares/auth.js";
import { gzipMiddleware } from "../middlewares/middle-gzip.js";

export const productsRouter = Router()

productsRouter.get('/', getProduct, gzipMiddleware)

productsRouter.get('/all-products', getsProducts, adminsOnly)

productsRouter.get('/:id', gzipMiddleware, getById, usersOnly)

productsRouter.post('/', createProduct, usersOnly)

productsRouter.put('/:id', updateProduct, adminsOnly)

productsRouter.delete('/:id', deleteProduct, adminsOnly)