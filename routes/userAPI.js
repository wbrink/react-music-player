const express = require('express');
const bcrypt = require("bcryptjs");
const isAuthenticated = require('../middleware/isAuthenticated');
const pool = require("../db");

const router = express.Router();

// router.get("/api/getSongs", (req,res) => {
//   res.json()
// })

router.get("/api/isAuthenticated", (req,res) => {
  if (req.user) {
    res.json({authenticated: true})
  } else {
    res.json({authenticated: false})
  }
})


// Login
router.post("/api/user/login", (req,res) => {
  const {username, email, password} = req.body;
  
  let sql = "SELECT * FROM users WHERE username = ? OR email = ?"
  pool.query(sql, [username, email], (error, results) => {
    if (error) {
      throw error;
    }
    const user = results[0]; // first element is the user since unique index on email and username
    if (user) {
      const comparePassword = bcrypt.compareSync(password, user.user_password);

      // if the password is correct
      if (comparePassword) {
        req.session.userID = user.id; // when the session object is adjusted it is saved to store
        res.json({username: user.username, id: user.id, joined: user.joined});
      } else {
        res.json({authenticated: false})
      }
    } else {
      // no user exists with that username or email
      res.json({authenticated: false})
    }
  })
})


// CREATE USER
router.post("/api/user/register", (req,res) => {
  const {username, email, password} = req.body;
  let hashedPassword = bcrypt.hashSync(password, 12);
  let sql = `INSERT INTO users SET ?`
  let values = {username: username, email: email, user_password: hashedPassword}
  
  pool.query(sql, values, (error, results) => {
    if (error) {
      if (error.errno === 1062) {
        // then duplicate user
        res.status(500).json({error: "user already exists"});
        return;
      } else {
        res.status(500).json({error: "internal server error"});
        return;
      }
    }
    // res.json({success: "user created sucessfully"});
    // console.log(results);

    // could redirect to /api/user/login with the given credentials and check that against the user in database
    res.redirect(307, "/api/user/login");
  })

})


// logout: (can only access this route if the user is already logged in)
router.get("/api/user/logout", isAuthenticated, (req,res) => {
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