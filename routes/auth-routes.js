import express from 'express'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
} from '../controllers/auth-controller.js'

import { validateUser } from '../middleware/validate-user.js'
import { protect } from '../middleware/auth-middleware.js'


router.
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     description: Register a new user
 *     parameters:
 *       - in: body
 *         name: username
 *         required: true
 *       - in: body
 *         name: email
 *         required: true
 *       - in: body
 *         name: firstName
 *         required: true
 *       - in: body
 *         name: lastName
 *         required: true       
 *     responses: 
 *       200:
 *         description: Success
 *       405:
 *         description: "Invalid Input"       
 */
  route('/register', ).post(validateUser, registerUser)
router
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login with existing user Id
 *     parameters:
 *       - in: body
 *         name: email
 *         required: true
 *       - in: body
 *         name: password
 *         required: true    
 *     responses: 
 *       200:
 *         description: Success
 *       405:
 *         description: "Invalid Input"
 *       401:
 *         description: "Authentication Failed"       
 */
  .post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)

export default router
