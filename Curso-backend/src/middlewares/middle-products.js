import { Router } from "express"

export const middleProducts = Router()

middleProducts.use('/products', (req, res, next) => {

    // @ts-ignore
    const { limit } = parseInt(req.query);
    if (limit > 28 || limit <= 0) {

        return next(new Error(`limite de producto inaccesible`))
    } else {
        next()
    }
})

// @ts-ignore
middleProducts.use((err, req, res, next) => {
    res.json({
        status: 'error',
        desc: err.message
    })
})