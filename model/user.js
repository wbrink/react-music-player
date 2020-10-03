const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 25
  },
  password: String,
  playlists: [{type: Schema.Types.ObjectId, ref: "Playlist"}],
  library: [{type: Schema.Types.ObjectId, ref: "Song"}]
}, {timestamps: true})


// hash the password before it is saved to the database
userSchema.pre("save", function(next) {
  // hash the password
  var salt = bcrypt.genSaltSync(12); // OWASP recommends 12
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash; // set the password to the salt
  next(); // must be called to keep the middleware going 
})


const User = mongoose.model("User", userSchema);


module.exports = User;