import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/auth-controller.js'

import { validateUser } from '../middleware/validate-user.js'
import { protect } from '../middleware/auth-middleware.js'

router.route('/register', ).post(validateUser, registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)

export default router
