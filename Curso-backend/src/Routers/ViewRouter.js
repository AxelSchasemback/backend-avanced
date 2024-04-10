// @ts-nocheck
import { Router } from "express"

export const viewsRouter = Router()

viewsRouter.get('/payment', (req, res) => {
    res.render('checkout', {
        titulo: 'PG - payment',
        userExist: req.user,
        session: req.user
    })
})

viewsRouter.get('/api/products', (req, res) => {
    res.render('producto', {
        titulo: 'PG - productos',
        userExist: req.user || null,
        session: req.user || null,
    });
});

viewsRouter.get('/reset-password', (req, res) => {
    const token = req.query.token || null;
    res.render('reset', { titulo: 'Reset Password', token });
});

viewsRouter.get('/login', (req, res) => {
    res.render('login', { titulo: 'PG - login' })
})

viewsRouter.get('/combos', (req, res) => {
    res.render('combos', {
        titulo: 'PG - Combos',
        userExist: req.user || null,
        session: req.user || null
    })
})

viewsRouter.get('/help', (req, res) => {
    res.render('ayuda', {
        titulo: 'PG - Help',
        userExist: req.user || null,
        session: req.user || null
    })
})

viewsRouter.get('/carrito', (req, res) => {
    res.render('carrito', {
        titulo: 'PG - Carrito',
        userExist: req.user || null,
        session: req.user || null
    })
})

viewsRouter.get('/register', (req, res) => {
    res.render('registro', {
        titulo: 'PG - Register',
    })
})

viewsRouter.get('/oferta', (req, res) => {
    res.render('ofertas', {
        titulo: 'PG - ofertas',
        userExist: req.user || null,
        session: req.user || null
    })
})