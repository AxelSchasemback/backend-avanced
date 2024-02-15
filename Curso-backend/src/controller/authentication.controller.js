import { User } from '../dao/user.dao.js'

export const verefication = async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ email: profile.username })
    if (user) {
        return done(null, User.userData(user))
    }

    try {
        const registerUser = await User.create({
            email: profile.username,
            password: '(nulo)',
            name: profile.displayName,
            cartId: await User.cartId()
        })
        return done(null, User.userData(registerUser))
    } catch (error) {
        return done(error)
    }
}

export const userRegister = async (req, _u, _p, done) => {
    try {
        const user = await User.register(req.body)
        done(null, user)
    } catch (error) {
        done(null, false, console.error(error))
    }
}

export const userLogin = async (email, password, done) => {
    try {
        const user = await User.validate(email, password)
        done(null, user)
    } catch (error) {
        return done(null, false, console.error(error))
    }
}

export const userReset = async (req, email, password, done) => {
    try {

        await User.validate(email, password)

        const usuario = await User.findOne({ email });

        usuario.password = req.body.reset;

        await usuario.save();

        const dataUser = await User.validate(email, req.body.reset)

        done(null, dataUser)
    } catch (error) {
        done(null, false, console.error(error))
    }
}