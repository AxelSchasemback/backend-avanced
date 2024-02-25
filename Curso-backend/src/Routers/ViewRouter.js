import { Router } from "express"

export const viewsRouter = Router()

viewsRouter.get('/payment', (req, res) => {
    res.render('purchase', {
        titulo: 'PG - payment',
        userExist: req.user,
        session: req.user
    })
})

viewsRouter.get('/carrito', (req, res) => {
    res.render('carrito', {
        titulo: 'PG - producto',
        userExist: req.user,
        session: req.user
    })
})

viewsRouter.get('/api/products', (req, res) => {
    res.render('producto', {
        titulo: 'PG - productos'
    })
})

viewsRouter.get('/api/account', (req, res) => {
    res.render('miCuenta', {
        titulo: 'PG - account',
        userExist: req.user || null,
        session: req.user || null
    })
})

viewsRouter.get('/reset', (req, res) => {
    res.render('reset', {
        titulo: 'Reset Password'
    })
})

viewsRouter.get('/api/login', (req, res) => {
    res.render('login', { titulo: 'PG - login' })
})

viewsRouter.get('/combos', (req, res) => {
    res.render('combos', { titulo: 'PG - Combos' })
})

viewsRouter.get('/help', (req, res) => {
    res.render('ayuda', { titulo: 'PG - Help' })
})

viewsRouter.get('/api/register', (req, res) => {
    res.render('registro', {
        titulo: 'PG - Register',
        script: 'userSesion'
    })
})

viewsRouter.get('/oferta', (req, res) => {
    res.render('ofertas', {
        titulo: 'PG - ofertas',
        userExist: req.user || null,
        session: req.user || null
    })
})