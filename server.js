require('dotenv').config();
const express = require("express");
const session = require('express-session');
const MySQLStore = require("express-mysql-session")(session);
const pool = require("./db");

const sessionStore = new MySQLStore({}, pool);

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({extended: false})); // parses urlencoded data (form data)


// setup express session
app.use(session({
  resave: false, // our store implements the touch method so we can resave = false
  saveUninitialized: false, // session will not be saved to the store as long as it is new but not modified (if it  gets modified then it will be saved)
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  cookie: {
    maxAge: Number(process.env.SESSION_LIFETIME),
    sameSite: true,
    // secure: true  // only if we are in production and can enable https
  }
}))

// middleware to attach user to req.user if authenticated
app.use(require("./middleware/loadUser"));
app.use(require("./routes/userAPI"));
app.use(require("./routes/tracksAPI"));


app.listen(PORT, () => console.log("Server Listening on port", PORT));


