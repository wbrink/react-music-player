const express = require('express');
const db = require("../model")
const bcrypt = require("bcryptjs");
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.get("/api/getSongs", (req,res) => {
  res.json()
})

router.get("/api/isAuthenticated", (req,res) => {
  if (req.user) {
    res.json({authenticated: true})
  } else {
    res.json({authenticated: false})
  }
})


// Login
router.post("/api/login", (req,res) => {
  const {username, password} = req.body;
  
  // // query the user and see if password matches
  db.User.findOne({username: username} , (err, user) => {
    if (err) throw err;
    
    if (user) {
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (comparePassword) {
        // edit the session so that the session is saved when the req ends and a cookie is given to the user
        req.session.userID = user._id;
        res.json(user);
      } else {
        res.json({authenticated: false});
      }
    } else {
      // then no user exists with that username
      res.json({authenticated: false})
    }
  })
})


// logout: (can only access this route if the user is already logged in)
router.get("/api/logout", isAuthenticated, (req,res) => {
  // hit this route we want to remove the session and unset the req.session property
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("connect.sid"); // this is the default value of the session Id cookie to set in the response (default value = 'connect.sid')
    res.json({msg: "session and cookie destroyed"});
  })
})


module.exports = router;