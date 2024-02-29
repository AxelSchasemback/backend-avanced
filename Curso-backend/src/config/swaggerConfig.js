import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { Router } from 'express'

export const swaggerRouter = Router()

const specs = swaggerJSDoc({
    openapi: '3.0.1',
    definition: {
        info: {
            title: 'Project Gaming - ecommerce',
            description: 'la práctica de comprar y vender productos a través de internet',
            version: '1.0'
        }
    },
    apis: ['./docs/**/*.yaml']
})

swaggerRouter.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))