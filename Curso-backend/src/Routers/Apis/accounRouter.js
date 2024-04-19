import { Router } from "express"
import { getUser, getAllUser, getDataUser, postDescription, putDataUser, delUser, updateUserAvatar } from "../../controller/account.controller.js";
import { hasPermission } from "../../middlewares/authorization.js";
import { upload } from "../../middlewares/multer.js";

export const accountRouter = Router()

accountRouter.get('/user/:id', getUser, hasPermission('admin'))

accountRouter.put('/user/:id', putDataUser, hasPermission('admin'))

accountRouter.delete('/user/:id', delUser, hasPermission('admin'))

accountRouter.get('/users', getAllUser, hasPermission('admin'))

accountRouter.get('/', getDataUser, hasPermission('admin'))

accountRouter.post('/', postDescription, hasPermission('user'))

accountRouter.put('/:email/avatar', upload.single('avatar'), updateUserAvatar, hasPermission('user'))