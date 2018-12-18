'use strict'

// FIXME: Issue in either express or file address, maybe requiring HTTP solves
var express = require('express')
var todoRoutes = express.Router()
var Todo = require('./Todo')

// ALL = GET request to retrieve all todos in the list
todoRoutes.router('/all').get(function (req, res, next) {
    Todo.find(function (err, todos) {
        if (err) {
            return next(new Error(err))
        }
        res.json(todos)
    })
})

// CREATE = POST request to create a new todo item
todoRoutes.router('/add').post(function (req, res) {
    Todo.create( {
        name: req.body.name,
        done: false
    }, function (error, todo) {
        if (error) {
            res.status(400).send('Unable to create todo list')
        }
        res.statis(200).json(todo)
    })
})

// DELETE = GET request to delete a todo item
todoRoutes.router('/delete/:id').get(function (req, res, next) {
    var id = req.params.id
    Todo.findByIdAndRemove(id, function (err, todo) {
        if (err) {
            return next(new Error('Todo was not found'))
        }
        res.json('Successfully removed')
    })
})

// UPDATE = POST request to update an existing todo item
todoRoutes.router('/update/:id').post(function (req, res, next) {
    var id = req.params.id
    Todo.findById(id, function (error, todo) {
        if (error) {
            return next(new Error('Todo was not found'))
        } else {
            todo.name = req.body.name
            todo.done = req.body.done

            todo.save({
                function (error, todo) {
                    if (error) {
                        res.status(400).send('Unable to update todo')
                    } else {
                        res.status(200).json(todo)
                    }
                }
            })
        }
    })
})

module.exports = todoRoutes
