import { Router } from 'express'
import { deleteCurrentUser, currentUser, getGithubCallback, loginUser, logoutUser } from '../controller/session.controller.js'
import { usersOnly, adminsOnly } from '../middlewares/auth.js'

export const sessionRouter = Router()

sessionRouter.post('/login', loginUser)

sessionRouter.get('/current', currentUser, usersOnly)

sessionRouter.delete('/current', deleteCurrentUser, adminsOnly)

sessionRouter.get('/githubcallback', getGithubCallback, usersOnly)

sessionRouter.get('/logout', logoutUser, usersOnly)