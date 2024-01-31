import { Router } from 'express'
import { deleteCurrentUser, currentUser, getGithubCallback, loginUser, logoutUser } from '../controller/session.controller.js'
import { usersOnly, adminsOnly } from '../middlewares/auth.js'

export const sessionRouter = Router()

sessionRouter.post('/login', loginUser)

sessionRouter.get('/current', currentUser, usersOnly, usersOnly)

sessionRouter.delete('/current', adminsOnly, deleteCurrentUser)

sessionRouter.get('/githubcallback', getGithubCallback)

sessionRouter.get('/logout', logoutUser)