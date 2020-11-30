// const mongoose = require("mongoose");

// const db = require("./model");
// let userId = mongoose.Types.ObjectId();
// let playlistID = mongoose.Types.ObjectId();

// mongoose.connect("mongodb://localhost/music_player", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });

// const mongooseConnection = mongoose.connection;

// // this runs once when the 
// mongooseConnection.once("open", () => {
//   console.log("connected");

//   db.Song.insertMany([
//   {
//     "title": "Deep State",
//     "artist": "Vans in Japan",
//     "album": "N/A",
//     "location": "/deep_state.mp3",
//     "genre": "N/A"
//   },
//   {
//     "title": "Don't Ya Bite Now",
//     "artist": "Dan Lebowitz",
//     "album": "N/A",
//     "location": "/don't_ya_bite_now.mp3",
//     "genre": "N/A"
//   },
//   {
//     "title": "Humidity",
//     "artist": "Silent Partner",
//     "album": "N/A",
//     "location": "/humidity.mp3",
//     "genre": "N/A"
//   },
//   {
//     "title": "Rest Easy",
//     "artist": "Vans in Japan",
//     "album": "N/A",
//     "location": "/rest_easy.mp3",
//     "genre": "N/A"
//   },
//   {
//     "title": "Savannah Sunshine",
//     "artist": "Dan Henig",
//     "album": "N/A",
//     "location": "/savannah_sunshine.mp3",
//     "genre": "N/A"
//   }], (err, songs) => {

//     if (err) throw err;
//     console.log("Inserted Docs", songs);

//     db.User.create({_id: userId, username: "dog", password: "helloworld", library: [songs[0]._id, songs[1]._id], playlists: [playlistID]}, (err, user) => {
//       console.log(user);


//       db.Playlist.create({_id: playlistID, userID: userId, name: "Cool Stuff", songs: [songs[2]._id, songs[3]._id]}, (err, playlist) => {
//         if (err) throw err;
//         console.log("playlist", playlist)
//         mongooseConnection.close();
//       })
      
//     });
//   })
// })

// mongooseConnection.on("error", () => {
//   console.log("there was an error");
// })


const mysql = require("mysql");

let options = {
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

const connection = mysql.createConnection(options);

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});


connection.query( 
  function(error, results, fields) {

});