import { Router } from "express"

export const viewsRouter = Router()

viewsRouter.get('/api/reset', (req, res) => {
    res.render('reset', {
        titulo: 'Reset Password'
    })
})

viewsRouter.get('/api/login', (req, res) => {
    res.render('login', { titulo: 'PG - login' })
})

viewsRouter.get('/api/combos', (req, res) => {
    res.render('combos', { titulo: 'PG - Combos' })
})

viewsRouter.get('/api/help', (req, res) => {
    res.render('ayuda', { titulo: 'PG - Help' })
})

viewsRouter.get('/api/register', (req, res) => {
    res.render('registro', {
        titulo: 'PG - Register',
        script: 'userSesion'
    })
})

viewsRouter.get('/api/offer', (req, res) => {
    res.render('ofertas', { titulo: 'PG - Offer' })
})
