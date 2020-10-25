const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 25
  },
  email: {
    type: String,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "input is not an email address"]
  },
  password: String,
  playlists: [{type: Schema.Types.ObjectId, ref: "Playlist"}],
  library: [{type: Schema.Types.ObjectId, ref: "Song"}]
}, {timestamps: true})

// add static method to model so that user can verify the password with user
// userSchema.statics.loginUser = function(username, password) {
//   return new Promise((resolve, reject) => {
//     this.find({username: username}, (err, doc) => {
//       if (err) {
//         console.error(error);
//         return reject(error)
//       }
//       resolve(doc.password);
//     })
//   })

// }

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