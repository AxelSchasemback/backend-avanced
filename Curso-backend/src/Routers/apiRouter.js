import { Router } from "express";
import { productsRouter } from './productsRouter.js'
import { CartsRouter } from './cartsRouter.js'
import { sessionRouter } from "./sessionRouter.js";
import { userRouter } from "./userRouter.js";
import { accountRouter } from './accounRouter.js'
import { middleSession } from "../middlewares/middle-session.js";
import { middleProducts } from "../middlewares/middle-products.js";
import { offerRouter } from './offerRouter.js';
import { comboRouter } from "./comboRouter.js";
import { swaggerRouter } from "./swaggerRouter.js";
import { logResponseStatus } from "../middlewares/handle-logger.js";
import { httpLoggerMiddleware } from "../middlewares/middle-logger.js";

export const apiRouter = Router()

apiRouter.use('/', logResponseStatus, httpLoggerMiddleware)
apiRouter.use('/account', accountRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', CartsRouter)
apiRouter.use('/offer', offerRouter)
apiRouter.use('/combo', comboRouter)
apiRouter.use('/', userRouter, swaggerRouter, sessionRouter, middleSession, middleProducts)

