import { Router } from "express";
import { adminsOnly, usersOnly } from "../middlewares/authorization.js";
import { createOrder, getOrder, delOrder, putOrder, getOrderById } from "../controller/order.controller.js";

export const ordeRouter = Router()

ordeRouter.get('/', getOrder, adminsOnly)

ordeRouter.get('/:id', getOrderById, adminsOnly)

ordeRouter.post('/', createOrder, usersOnly)

ordeRouter.put('/:id', putOrder, adminsOnly)

ordeRouter.delete('/:id', delOrder, adminsOnly)