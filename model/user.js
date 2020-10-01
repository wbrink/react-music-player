const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 25
  },
  playlists: [{type: Schema.Types.ObjectId, ref: "Playlist"}],
  library: [{type: Schema.Types.ObjectId, ref: "Song"}]
}, {timestamps: true})


const User = mongoose.model("User", userSchema);


module.exports = User;