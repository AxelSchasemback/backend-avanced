import swaggerUiExpress from 'swagger-ui-express'
import { specs } from '../../config/swaggerConfig.js'
import { Router } from "express"

export const swaggerRouter = Router()

swaggerRouter.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))