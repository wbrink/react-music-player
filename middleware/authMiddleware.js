const db = require("../model");

// middleware to set the user to the req object if the session is still live
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
    next();
  }
}


module.exports = authMiddleware;