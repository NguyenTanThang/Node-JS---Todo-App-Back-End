var express = require('express');
var router = express.Router();
const User = require("../models/User");
const {
  isAnyNull
} = require("../config/additional-functions");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/config");

/* GET users listing. */
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      return res.json(user);
    })
})

router.get('/', function (req, res, next) {

  if (req.query.facebook_id){
    User.findOne({
      facebook_id: req.query.facebook_id
    })
    .then(user => {
      return res.json(user);
    })
  } else {
    User.find()
    .then(users => {
      return res.json(users);
    })
  }

  
});

router.post("/signup", (req, res) => {
  const {
    facebook_id,
    username,
    email,
    imageURL
  } = req.body;

  if (isAnyNull(facebook_id, username, email, imageURL)) {
    return res.json({
      msg: "Missing Credentials",
      msg_type: "warning"
    })

  }

  User.findOne({
      facebook_id
    })
    .then(existUser => {
      if (existUser) {
        return res.json({
          msg: "This account already existed",
          msg_type: "danger"
        })
      } else {
        new User({
            facebook_id,
            username,
            email,
            imageURL
          })
          .save()
          .then(user => {
            const token = jwt.sign({user_id: user._id}, JWT_SECRET);
            res.setHeader("auth-token", token);
            return res.json({
              msg: "Successfully created a new user",
              msg_type: "success",
              user,
              token
            })
          })
      }
    })

})

router.post("/login", (req, res) => {
  const {
    facebook_id
  } = req.body;

  if (isAnyNull(facebook_id)) {
    return res.json({
      msg: "Missing Credentials",
      msg_type: "warning"
    })
  }

  User.findOne({
      facebook_id
    })
    .then(existUser => {
      if (!existUser) {
        return res.json({
          msg: "User doesn't exist",
          msg_type: "danger"
        })
      } else {
        const token = jwt.sign({user_id: existUser._id}, JWT_SECRET);
        res.setHeader("auth-token", token);
        return res.json({
          msg: "Logged in as " + existUser.username,
          msg_type: "success",
          user: existUser,
          token
        })
      }

    })
})

module.exports = router;