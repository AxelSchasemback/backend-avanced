import { userManager } from "../dao/index.dao.js";

export const getUser = async (req, res) => {
    try {

        const id = req.params['id']

        res.status(200).json( await userManager.getUserById(id))

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const user = await userManager.getUser()
        res.status(200).json(await userManager.getUser())

    } catch (error) {

        res.status(404).json({ message: error.message });
    }
}


export const getDataUser = async (req, res) => {
    try {
        const user = req.user || null

        const usuario = await userManager.getUserByEmail(user.email)

        res.status(201).render('miCuenta', {
            session: user,
            cartId: usuario.cartId,
            titulo: 'PG - Account',
            name: usuario.name,
            email: usuario.email,
            sex: usuario.sex,
            date: usuario.date,
            orders: usuario.orders,
            description: usuario.description
        })
    } catch (error) {
        res.status(401).redirect('/api/login');
    }
}

export const postDescription = async (req, res) => {
    try {
        const user = req.user || null

        await userManager.updateUser(user.email, { description: req.body.description })

        res.status(201).redirect('/api/account')
    } catch (error) {
        res.status(500).redirect('/api/account')
    }
}