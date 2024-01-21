import { Router } from 'express'
import { deleteCurrentUser, getCurrentUser, getGithubCallback, loginUser, logoutUser } from '../controller/session.controller.js'

export const sessionRouter = Router()

sessionRouter.post('/login', loginUser)

sessionRouter.get('/current', getCurrentUser)

sessionRouter.delete('/current', deleteCurrentUser)

sessionRouter.get('/githubcallback', getGithubCallback)

sessionRouter.get('/logout', logoutUser)