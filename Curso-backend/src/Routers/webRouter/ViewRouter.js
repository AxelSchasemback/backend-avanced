// @ts-nocheck
import { hasPermission } from "../../middlewares/authorization.js"

import { Router } from "express"

export const viewsRouter = Router()

viewsRouter.get('/payment', (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    hasPermission('user')(req, res, next);
}, (req, res) => {
    res.render('checkout', {
        titulo: 'PG - payment',
    });
});

viewsRouter.get('/perfil', (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    hasPermission('user')(req, res, next);
}, (req, res) => {
    res.render('miCuenta', {
        titulo: 'PG - perfil',
    });
});

viewsRouter.get('/products', (req, res) => {
    const { limit, page, sort, category, search } = req.query
    res.render('producto', {
        titulo: 'PG - productos', limit, page, sort, category, search
    })
})

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
    })
})

viewsRouter.get('/help', (req, res) => {
    res.render('ayuda', {
        titulo: 'PG - Help',
    })
})


viewsRouter.get('/carrito', (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    hasPermission('user')(req, res, next)
}, (req, res) => {
        res.render('carrito', {
            titulo: 'PG - carrito',
        });
    });

viewsRouter.get('/register', (req, res) => {
    res.render('registro', {
        titulo: 'PG - Register',
    })
})

viewsRouter.get('/oferta', (req, res) => {
    res.render('ofertas', {
        titulo: 'PG - ofertas',
    })
})

viewsRouter.get('/user-admin', (req, res, next) => {
    if (req.user['rol'] !== 'admin') {
        return res.redirect('/products');
    }

    hasPermission('admin')(req, res, next);
}, (req, res) => {
    res.render('userAdmin', {
        titulo: 'PG - console',
    });
});