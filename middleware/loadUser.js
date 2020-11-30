const db = require("../model");

// req.session middleware will look for connect.sid cookie that is present and load the data that is saved in the session store that matches the cookies unsigned signature
// in our case in api_routes we save the userID to the session store and use this middleware to load the user into the req object if the user is still logged in
const loadUser = (req,res,next) => {
  if (req.session.userID) {
    // db.User.findById(req.session.userID, (err, user) => {
    //   if (err) throw err;
    //   if (user) {
    //     req.user = {username: user.username, email: user.email, playlists: user.playlists, library: user.library}
    //     next(); // call the next middleware
    //   } else {
    //     next();
    //   }
    // })
  } else {
    next();
  }
}

module.exports = loadUser;



// unauthorized
// res.status(401).json({authenticated: false})