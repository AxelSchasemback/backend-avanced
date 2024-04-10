import { Router } from "express";
import { getProduct, getsProducts, getById, createProduct, updateProduct, deleteProduct } from "../controller/products.controller.js";
import { adminsOnly, premiumsOnly } from "../middlewares/authorization.js";

export const productsRouter = Router()

productsRouter.get('/', getProduct )

productsRouter.get('/all-products', getsProducts)

productsRouter.get('/:id', getById)

productsRouter.post('/', createProduct, adminsOnly, premiumsOnly)

productsRouter.put('/:id', updateProduct, adminsOnly, premiumsOnly)

productsRouter.delete('/:id', deleteProduct, adminsOnly)