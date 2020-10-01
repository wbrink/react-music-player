const mongoose = require("mongoose");

const {Schema} = mongoose;

const playlistSchema = new Schema({
  userID: {type: Schema.Types.ObjectId, ref: "User"},
  name: String,
  songs: [{type: Schema.Types.ObjectId, ref: "Song"}]

}, {timestamps: true});

const Playlist = mongoose.model("Playlist", playlistSchema)


module.exports = Playlist


