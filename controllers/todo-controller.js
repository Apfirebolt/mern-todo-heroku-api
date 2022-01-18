import asyncHandler from 'express-async-handler'
import ToDo from '../models/ToDo.js'

// @desc    Get all todos related to logged in user
// @route   GET /api/todos
// @access  Private
const getAllToDos = asyncHandler(async (req, res) => {
  const todos = await ToDo.find({ createdBy: req.user._id })

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

  const ToDoExists = await ToDo.findOne({ name, createdBy: req.user._id })

  if (ToDoExists) {
    res.status(409)
    throw new Error("ToDo already created by user")
  }

  const ToDo = await ToDo.create({
    name,
    createdBy: req.user._id
  })

  if (ToDo) {
    res.status(201).json({
      ToDo,
      message: 'ToDo created'
    })
  } else {
    res.status(401)
    throw new Error("Invalid ToDo data")
  }
})

// @desc    Update existing ToDo
// @route   PUT /api/todos/:id
// @access  Private
const updateToDo = asyncHandler(async (req, res) => {

  const updatedToDo = await ToDo.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, {
    new: true
  })

  if (updatedToDo) {
    res.status(200).json({
      ToDo: updatedToDo,
      message: 'ToDo updated'
    })
  } else {
    res.status(400)
    throw new Error("Invalid ToDo data")
  }
})

// @desc    User deletes a single ToDo and all nested contents
// @route   DELETE /api/todos/:id
// @access  Private
const deleteToDo = asyncHandler(async (req, res) => {
  const ToDoDeleted = await ToDo.findOneAndDelete({ createdBy: req.user._id, _id: req.params.id })

  if (ToDoDeleted) {
    res.status(200).json({
      message: 'ToDo deleted successfully'
    })
  } else {
    res.status(404)
    throw new Error("ToDo not found")
  }
})

// @desc    Get a single ToDo
// @route   GET /api/todos/:id
// @access  Private
const getToDo = asyncHandler(async (req, res) => {
  const ToDo = await ToDo.findById({ _id: req.params.id })

  if (ToDo) {
    if (toString(ToDo.createdBy._id) !== toString(req.user._id)) {
      res.status(403)
      throw new Error("Not authorized to access this content")
    }
    res.status(200).json(ToDo)
  } else {
    res.status(404)
    throw new Error("ToDo not found")
  }
})

export { 
  addToDo, 
  getToDo, 
  deleteToDo, 
  updateToDo, 
  getAllToDos,
}
