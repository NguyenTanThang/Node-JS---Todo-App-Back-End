var express = require('express');
var router = express.Router();
var Note = require("../models/Note");
var {
    isAnyNull
} = require("../config/additional-functions");

const getNoteViaUserID = (user_id, req, res) => {
    Note.find({
            user_id
        })
        .then(notes => {
            return res.json(notes);
        })
}

router.get('/', function (req, res, next) {
    const user_id = req.query.user_id;

    if (user_id !== undefined) {
        getNoteViaUserID(user_id, req, res);
    } else {
        Note.find()
        .then(notes => {
            return res.json(notes);
        })
    }

    
});

router.get('/:id', function (req, res, next) {
    const id = req.params.id;

    Note.findById(id)
        .then(note => {
            return res.json(note);
        })
});

router.post('/add', function (req, res, next) {
    const {
        user_id,
        title,
        body
    } = req.body;

    if (isAnyNull(user_id, title)) {
        return res.json({
            msg: "Missing Credentials",
            msg_type: "warning"
        })
    }

    new Note({
            user_id,
            title,
            body
        })
        .save()
        .then(createdNote => {
            return res.json({
                msg: "Successfully created a new note item",
                msg_type: "success",
                createdNote
            })
        })
});

router.put("/edit/:id", (req, res) => {
    const id = req.params.id;

    const {
        title,
        body
    } = req.body;

    if (isAnyNull(title)) {
        return res.json({
            msg: "Missing Credentials",
            msg_type: "warning"
        })
    }

    Note.findByIdAndUpdate(id, {
            title,
            body
        })
        .then(
            Note.findById(id)
            .then(updatedNote => {
                return res.json({
                    msg: "Successfully updated a new note item",
                    msg_type: "success",
                    updatedNote
                })
            })
        )
})

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    Note.findByIdAndDelete(id)
        .then(deletedNote => {
            return res.json({
                msg: "Successfully deleted a new note item",
                msg_type: "success",
                deletedNote
            })
        })
})

module.exports = router;