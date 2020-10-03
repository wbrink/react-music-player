const db = require("../model");

function authMiddleware(req, res, next) {
  // if we are logged in, set the user to the req object
  if(req.session.userID) {
    // query the database for the user
    db.User.findById(req.session.userID, (err, user) => {
      if (err) {
        throw err;
      }
      console.log("logged In")
      req.user = user;
      next();
    })
  } else {
    console.log("not logged in");
    // res.end("you are not authorized");
    res.end("not logged in");
  }
}


module.exports = authMiddleware;