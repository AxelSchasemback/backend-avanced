import { Router } from 'express'
import { deleteCurrentUser, currentUser, getGithubCallback, loginUser, logoutUser } from '../controller/session.controller.js'
import { usersOnly, adminsOnly } from '../middlewares/authorization.js'

export const sessionRouter = Router()

sessionRouter.post('/login', loginUser)

sessionRouter.get('/current', currentUser)

sessionRouter.delete('/current', deleteCurrentUser, usersOnly)

sessionRouter.get('/githubcallback', getGithubCallback, usersOnly)

sessionRouter.get('/logout', logoutUser, usersOnly)