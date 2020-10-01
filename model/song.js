const mongoose = require("mongoose");

const {Schema} = mongoose;

const songSchema = new Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  location: String // where the file is located
})


const Song = mongoose.model("Song", songSchema);


module.exports = Song;