import { Router } from "express";
import { getProduct, getsProducts, getById, createProduct, updateProduct, deleteProduct } from "../../controller/products.controller.js";
import { hasPermission } from "../../middlewares/authorization.js";

export const productsRouter = Router()

productsRouter.get('/', getProduct )

productsRouter.get('/all-products', getsProducts)

productsRouter.get('/:id', getById)

productsRouter.post('/', createProduct, hasPermission('premium'))

productsRouter.put('/:id', updateProduct, hasPermission('premum'))

productsRouter.delete('/:id', deleteProduct, hasPermission('admin'))