import { Router } from 'express'
import { deleteCurrentUser, currentUser, getGithubCallback, loginUser, logoutUser } from '../controller/session.controller.js'
import { usersOnly, adminsOnly } from '../middlewares/auth.js'
import { authenticate } from '../middlewares/passport.js'

export const sessionRouter = Router()

sessionRouter.post('/login', loginUser, usersOnly, authenticate)

sessionRouter.get('/current', currentUser, usersOnly, authenticate)

sessionRouter.delete('/current', adminsOnly, deleteCurrentUser)

sessionRouter.get('/githubcallback', getGithubCallback, usersOnly)

sessionRouter.get('/logout', logoutUser, usersOnly)