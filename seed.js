const mongoose = require("mongoose");

const db = require("./model");

mongoose.connect("mongodb://localhost/music_player", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const mongooseConnection = mongoose.connection;

// this runs once when the 
mongooseConnection.once("open", () => {
  console.log("connected");
  db.User.create({username: "dog"}, (err, doc) => {
    console.log(doc);
  })
})

mongooseConnection.on("error", () => {
  console.log("there was an error");
})