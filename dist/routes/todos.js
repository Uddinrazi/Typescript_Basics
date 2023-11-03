"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import express from 'express'
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Added todo', todo: newTodo, todos: todos });
});
router.put('/todo/:todoId', (req, res) => {
    const params = req.params;
    const tId = params.todoId;
    const body = req.body;
    const todoIndx = todos.findIndex((todoItem) => todoItem.id === tId);
    if (todoIndx >= 0) {
        todos[todoIndx] = { id: todos[todoIndx].id, text: body.text };
        return res.status(200).json({ message: 'Updated todo', todos: todos });
    }
    res.status(404).json({ message: 'todos not fount for this id ' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
    return res.status(200).json({ message: 'deleted todos', todos: todos });
});
exports.default = router;
