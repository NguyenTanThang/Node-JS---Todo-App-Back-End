var express = require('express');
var router = express.Router();
var Todo = require("../models/Todo");
var {
    isAnyNull
} = require("../config/additional-functions");

const getTodoViaUserID = (user_id, req, res) => {
    Todo.find({
            user_id
        })
        .then(todos => {
            return res.json(todos);
        })
}

router.get('/', function (req, res, next) {
    const user_id = req.query.user_id;

    if (user_id !== undefined) {
        getTodoViaUserID(user_id, req, res);
    } else {
        Todo.find()
        .then(todos => {
            return res.json(todos);
        })
    }

    
});

router.get('/:id', function (req, res, next) {
    const id = req.params.id;

    Todo.findById(id)
        .then(todo => {
            return res.json(todo);
        })
});

router.post('/add', function (req, res, next) {
    const {
        user_id,
        title
    } = req.body;

    if (isAnyNull(user_id, title)) {
        return res.json({
            msg: "Missing Credentials",
            msg_type: "warning"
        })
    }

    new Todo({
            user_id,
            title
        })
        .save()
        .then(createdTodo => {
            return res.json({
                msg: "Successfully created a new todo item",
                msg_type: "success",
                createdTodo
            })
        })
});

router.put("/edit/:id", (req, res) => {
    const id = req.params.id;

    const {
        title
    } = req.body;

    if (isAnyNull(title)) {
        return res.json({
            msg: "Missing Credentials",
            msg_type: "warning"
        })
    }

    Todo.findByIdAndUpdate(id, {
            title
        })
        .then(
            Todo.findById(id)
            .then(updatedTodo => {
                return res.json({
                    msg: "Successfully updated a new todo item",
                    msg_type: "success",
                    updatedTodo
                })
            })
        )
})

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndDelete(id)
        .then(deletedTodo => {
            return res.json({
                msg: "Successfully deleted a new todo item",
                msg_type: "success",
                deletedTodo
            })
        })
})

module.exports = router;