import { Router } from "express";
import { hasPermission } from "../../middlewares/authorization.js";
import { createOrder, getOrder, delOrder, putOrder, getOrderById } from "../../controller/order.controller.js";

export const ordeRouter = Router()

ordeRouter.get('/', getOrder, hasPermission('admin'))

ordeRouter.get('/:id', getOrderById, hasPermission('admin'))

ordeRouter.post('/', createOrder, hasPermission('user'))

ordeRouter.put('/:id', putOrder, hasPermission('admin'))

ordeRouter.delete('/:id', delOrder, hasPermission('admin'))