var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    users: "/users to view all users",
    todos: "/todos to view all todos",
    notes: "/notes to view all notes"
  })
});

module.exports = router;
