const pool = require("../db"); // returns pool of mysql connections

// req.session middleware will look for connect.sid cookie that is present and load the data that is saved in the session store that matches the cookies unsigned signature
// in our case in api_routes we save the userID to the session store and use this middleware to load the user into the req object if the user is still logged in
const loadUser = (req,res,next) => {
  if (req.session.userID) {
    let sql = "SELECT * FROM users WHERE id = ?";
    pool.query(sql, req.session.userID, (error, results) => {
      if (err) throw err;
      if (results[0]) {
        let user = results[0];
        req.user = {username: user.username, id: user.id, email: user.email, joined: user.joined};
        next();
      } else {
        next();
      }
    })
  } else {
    next();
  }
}

module.exports = loadUser;



// unauthorized
// res.status(401).json({authenticated: false})