import { Router } from 'express'
import { currentUser, getGithubCallback, loginUser, logoutUser } from '../../controller/session.controller.js'
import { passportLogin, sessionAuth } from '../../middlewares/passport.js'
import { hasPermission } from '../../middlewares/authorization.js'

export const sessionRouter = Router()

sessionRouter.post('/login', passportLogin, loginUser)

sessionRouter.get('/current', sessionAuth, currentUser)

sessionRouter.get('/githubcallback', getGithubCallback)

sessionRouter.get('/logout', logoutUser, hasPermission('user'))