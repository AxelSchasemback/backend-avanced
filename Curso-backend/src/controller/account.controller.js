import { User } from "../dao/user.dao.js";


export const getDataUser = async (req, res) => {
    try {
        const user = req.user || null

        const usuario = await User.findOne({ email: user.email }).lean()

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
        res.status(500).json({ message: error.message });
    }
}

export const postDescription = async (req, res) => {
    try {
        const user = req.user || null

        await User.findOneAndUpdate(
            { email: user.email },
            { $set: { description: req.body.description } },
            { new: true, lean: true }
        );
        res.status(201).redirect('/api/account')
    } catch (error) {
        res.status(500).redirect('/api/account')
    }
}