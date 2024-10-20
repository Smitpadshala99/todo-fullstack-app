const asyncHandler = require('express-async-handler');
const Todo = require('../models/Todo');

// @desc    Get todos
// @route   GET /api/todos
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
});

// @desc    Create todo
// @route   POST /api/todos
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const todo = await Todo.create({
        text: req.body.text,
        user: req.user.id,
        completed: false,
    });

    res.status(201).json(todo);
});

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        res.status(404);
        throw new Error('Todo not found');
    }

    // Check for user
    if (todo.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTodo);
});

// @desc    Delete todo by ID
// @route   DELETE /api/todos/:id
// @access  Private
// const deleteTodo = asyncHandler(async (req, res) => {
//     console.log("Delete request received for ID:", req.params.id);

//     const todo = await Todo.findById(req.params.id);

//     if (!todo) {
//         console.error("Todo not found for ID:", req.params.id);
//         res.status(404);
//         throw new Error('Todo not found');
//     }

//     // Check for user
//     if (todo.user.toString() !== req.user.id) {
//         console.error("Unauthorized deletion attempt by user:", req.user.id);
//         res.status(401);
//         throw new Error('User not authorized');
//     }

//     await todo.remove();

//     console.log("Todo deleted successfully:", todo._id);
//     res.status(200).json({ message: 'Todo deleted successfully' });
// });

const deleteTodo = asyncHandler(async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);
    
    const todoBefore = await Todo.findById(req.params.id);
    console.log("Todo before deletion:", todoBefore);
    
    if (!todoBefore) {
        console.error("Todo not found for ID:", req.params.id);
        return res.status(404).json({ message: 'Todo not found' });
    }

    // Check for user
    if (todoBefore.user.toString() !== req.user.id) {
        console.error("Unauthorized deletion attempt by user:", req.user.id);
        return res.status(401).json({ message: 'User not authorized' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    
    const todoAfter = await Todo.findById(req.params.id); // Check again after deletion
    console.log("Todo after deletion attempt:", todoAfter);

    res.status(200).json({ message: 'Todo deleted successfully' });
});


module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
