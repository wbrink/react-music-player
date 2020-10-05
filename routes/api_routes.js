const express = require('express');
const { read } = require('fs');

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


router.get("/api/logout", (req,res) => {
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