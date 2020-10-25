const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    // unauthorized
    res.status(401).json({authenticated: false});
  }
}

module.exports = isAuthenticated;