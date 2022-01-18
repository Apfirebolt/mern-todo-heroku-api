import express from 'express'
const router = express.Router()
import {
  addToDo,
  getToDo,
  getAllToDos,
  updateToDo,
  deleteToDo
} from '../controllers/todo-controller.js'

import { protect } from '../middleware/auth-middleware.js'

router
  .route('/')
  .get(protect, getAllToDos)
  .post(protect, addToDo)
router
  .route('/:id')
  .get(protect, getToDo)
  .put(protect, updateToDo)
  .delete(protect, deleteToDo)

export default router
