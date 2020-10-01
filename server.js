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


// api routes (we can use the model before the it is actually connected because)
// That's because mongoose buffers model function calls internally. This buffering is convenient, but also a common source of confusion. Mongoose will not throw any errors by default if you use a model without connecting.
// it will simply hang
app.use(require("./routes/api_routes"));


// setup express session
app.use(session({
  resave: false, // our store implements the touch method so we can resave = false
  saveUninitialized: false,
  sercret: process.env.SESSION_SECRET,
  store: new MongoStore({mongooseConnection: mongooseConnection}),
  cookie: {
    maxAge: process.env.SESSION_LIFETIME,
    sameSite: true,
    // secure: true  // only if we are in production and can enable https
  }
}))


// run the app when connected to the database
mongooseConnection.once("open", () => {
  app.listen(PORT, () => console.log("Server Listening on port", PORT));
})

// don't run application if there is an error connecting to the db
mongooseConnection.on("error", console.error.bind(console, "connection error"));

