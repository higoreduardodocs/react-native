import express from 'express'

import auth from './auth-route.js'
import user from './user-route.js'
import order from './order-route.js'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', user)
router.use('/orders', order)

export default router
