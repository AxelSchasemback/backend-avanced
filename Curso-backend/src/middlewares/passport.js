import passport from 'passport'

export const passportLocalRegister = passport.authenticate('local-register', {
    failWithError: true,
})

export const passportLogin = passport.authenticate('local-login', {
    failWithError: true,
})

export const passportReset = passport.authenticate('local-reset', {
    failWithError: true,
})

export const sessionAuth = passport.authenticate('jwtAuth', {
    session: false
})