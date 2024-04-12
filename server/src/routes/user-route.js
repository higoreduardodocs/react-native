import express from 'express'

import { useError } from '../middlewares/error-handler.js'
import * as userController from '../controllers/user-controller.js'

const router = express.Router()

router.post('/addresses', useError(userController.addAddress))
router.get('/addresses/:id', useError(userController.addresses))
router.get('/:id', useError(userController.getProfile))

export default router
