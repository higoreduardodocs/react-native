import express from 'express'

import { useError } from '../middlewares/error-handler.js'
import * as authController from '../controllers/auth-controller.js'

const router = express.Router()

router.post('/save', useError(authController.save))
router.get('/verify/:token', useError(authController.verify))
router.post('/login', useError(authController.login))

export default router
