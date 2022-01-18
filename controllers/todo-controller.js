import asyncHandler from 'express-async-handler'
import ToDoModel from '../models/ToDo.js'

// @desc    Get all todos related to logged in user
// @route   GET /api/todos
// @access  Private
const getAllToDos = asyncHandler(async (req, res) => {
  const todos = await ToDoModel.find({ createdBy: req.user._id })

  if (todos) {
    res.status(200).json({
      results: todos,
      total: todos.length
    })
  } else {
    res.status(404)
    throw new Error("todos not found")
  }
})

// @desc    User would add a new ToDo
// @route   POST /api/todos
// @access  Private
const addToDo = asyncHandler(async (req, res) => {
  const { name } = req.body

  const toDoExists = await ToDoModel.findOne({ name, createdBy: req.user._id })

  if (toDoExists) {
    res.status(409)
    throw new Error("To Do already created by user")
  }

  const toDo = await ToDoModel.create({
    name,
    createdBy: req.user._id
  })

  if (toDo) {
    res.status(201).json({
      toDo,
      message: 'To Do created'
    })
  } else {
    res.status(401)
    throw new Error("Invalid To Do data")
  }
})

// @desc    Update existing ToDo
// @route   PUT /api/todos/:id
// @access  Private
const updateToDo = asyncHandler(async (req, res) => {

  const updatedToDo = await ToDoModel.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, {
    new: true
  })

  if (updatedToDo) {
    res.status(200).json({
      toDo: updatedToDo,
      message: 'To Do updated'
    })
  } else {
    res.status(400)
    throw new Error("Invalid To Do data")
  }
})

// @desc    User deletes a single ToDo and all nested contents
// @route   DELETE /api/todos/:id
// @access  Private
const deleteToDo = asyncHandler(async (req, res) => {
  const toDoDeleted = await ToDoModel.findOneAndDelete({ createdBy: req.user._id, _id: req.params.id })

  if (toDoDeleted) {
    res.status(200).json({
      message: 'To Do deleted successfully'
    })
  } else {
    res.status(404)
    throw new Error("To Do not found")
  }
})

// @desc    Get a single ToDo
// @route   GET /api/todos/:id
// @access  Private
const getToDo = asyncHandler(async (req, res) => {
  const toDo = await ToDoModel.findById({ _id: req.params.id })

  if (toDo) {
    if (toString(toDo.createdBy._id) !== toString(req.user._id)) {
      res.status(403)
      throw new Error("Not authorized to access this content")
    }
    res.status(200).json(toDo)
  } else {
    res.status(404)
    throw new Error("To Do not found")
  }
})

export { 
  addToDo, 
  getToDo, 
  deleteToDo, 
  updateToDo, 
  getAllToDos,
}
