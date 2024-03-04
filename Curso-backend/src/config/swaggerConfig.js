import swaggerJSDoc from 'swagger-jsdoc'

export const specs = swaggerJSDoc({
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Project Gaming - ecommerce',
            description: 'la práctica de comprar y vender productos a través de internet',
            version: '1.0'
        },
    },
    apis: ['./docs/**/*.yaml']
})