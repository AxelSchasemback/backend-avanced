import { Router } from "express";
import { getProduct, getById, createProduct, updateProduct, deleteProduct } from "../controller/products.controller.js";

export const productsRouter = Router()

productsRouter.get('/', getProduct)

productsRouter.get('/:id', getById)

productsRouter.post('/', createProduct)

productsRouter.put('/:id', updateProduct)

productsRouter.delete('/:id', deleteProduct)