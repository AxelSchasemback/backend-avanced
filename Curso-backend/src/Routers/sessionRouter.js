import { Router } from 'express'
import { deleteCurrentUser, currentUser, getGithubCallback, loginUser, logoutUser } from '../controller/session.controller.js'
import { passportLogin, sessionAuth } from '../middlewares/passport.js'
import { usersOnly, adminsOnly } from '../middlewares/authorization.js'

export const sessionRouter = Router()

sessionRouter.post('/login', passportLogin, loginUser)

sessionRouter.get('/current', sessionAuth, currentUser)

sessionRouter.delete('/current', deleteCurrentUser)

sessionRouter.get('/githubcallback', getGithubCallback)

sessionRouter.get('/logout', logoutUser,deleteCurrentUser, usersOnly)