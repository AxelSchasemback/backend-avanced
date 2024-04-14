import { Router } from "express";
import { productsRouter } from '../Apis/productsRouter.js'
import { CartsRouter } from '../Apis/cartsRouter.js'
import { sessionRouter } from "../Apis/sessionRouter.js";
import { userRouter } from "../Apis/userRouter.js";
import { accountRouter } from '../Apis/accounRouter.js'
import { middleSession } from "../../config/sessionConfig.js";
import { middleProducts } from "../../middlewares/middle-products.js";
import { offerRouter } from '../Apis/offerRouter.js';
import { comboRouter } from "../Apis/comboRouter.js";
import { ordeRouter } from "../Apis/orderRouter.js";
import { swaggerRouter } from "../Apis/swaggerRouter.js";
import { logResponseStatus } from "../../middlewares/handle-logger.js";
import { httpLoggerMiddleware } from "../../middlewares/middle-logger.js";
import { respuestaMejoradas } from "../../middlewares/metodos-personalizados.js";

export const apiRouter = Router()

apiRouter.use('/', middleProducts, respuestaMejoradas)
apiRouter.use('/', logResponseStatus, httpLoggerMiddleware)
apiRouter.use('/account', accountRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', CartsRouter)
apiRouter.use('/offer', offerRouter)
apiRouter.use('/combo', comboRouter)
apiRouter.use('/order', ordeRouter)
apiRouter.use('/', userRouter, swaggerRouter, sessionRouter, middleSession )