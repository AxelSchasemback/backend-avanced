import { User } from "../model/user.js";

export const getDataUser = async (req, res) => {
    try {
        const user = req.user || null

        console.log(user)

        const usuario = await User.findOne({ email: user.email }).lean()

        res.render('miCuenta', {
            session: user,
            cartId: usuario.cartId,
            titulo: 'PG - Account',
            name: usuario.name,
            email: usuario.email,
            sex: usuario.sex,
            date: usuario.date,
            description: usuario.description
        })
    } catch (error) {
        res.send(error.message)
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
        res.redirect('/api/account')
    } catch (error) {
        console.error(error)
        res.redirect('/api/account')
    }
}