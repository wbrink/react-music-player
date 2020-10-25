require('dotenv').config();
const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const app = express();
const PORT = process.env.PORT;

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/music_player", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const mongooseConnection = mongoose.connection;

// parses incoming requests with JSON payloads
app.use(express.json());
// parses urlencoded data (form data)
app.use(express.urlencoded({extended: false}));





// setup express session
app.use(session({
  resave: false, // our store implements the touch method so we can resave = false
  saveUninitialized: false, // session will not be saved to the store as long as it is new but not modified (if it  gets modified then it will be saved)
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({mongooseConnection: mongooseConnection}),
  cookie: {
    maxAge: Number(process.env.SESSION_LIFETIME),
    sameSite: true,
    // secure: true  // only if we are in production and can enable https
  }
}))

// middleware to attach user to req.user if authenticated
app.use(require("./middleware/loadUser"));


// api routes (we can use the model before the it is actually connected because)
// That's because mongoose buffers model function calls internally. This buffering is convenient, but also a common source of confusion. Mongoose will not throw any errors by default if you use a model without connecting.
// it will simply hang
app.use(require("./routes/api_routes"));

app.get("/", (req,res) => {
  console.log("session", req.session);
  console.log("req.user", req.user);
  if (!req.session.viewCount) {
    req.session.viewCount = 1
  } else {
    req.session.viewCount++;
  }
  // req.session.viewCount = 5;
  res.send(req.session);
})


app.route("/login")
  .get((req,res) => {
    res.send(
      `
      <form action="/login" method="post">
        <input type="text" name="username" value="username">
        <input type="password" name="password">
        <input type="submit" value="Login">
      </form>
      `
    )
  })
  .post((req,res) => {
    const {username, password} = req.body;
    console.log(username, password);

    res.redirect("/");
  })



// run the app when connected to the database
mongooseConnection.once("open", () => {
  app.listen(PORT, () => console.log("Server Listening on port", PORT));
})

// don't run application if there is an error connecting to the db
mongooseConnection.on("error", console.error.bind(console, "connection error"));

