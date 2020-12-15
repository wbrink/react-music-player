const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const pool = require("../db");



router.post("/api/tracks/search", isAuthenticated ,(req,res) => {
  const {search} = req.body;
  let sql = `CALL searchTracks(?); CALL searchArtists(?); CALL searchAlbums(?)`;
  // let sql = "CALL searchTracks(?);";
  pool.query(sql, [search, search, search], (error, results) => {
    if (error) throw error;
    // remove affectedRows insertID array
    results.splice(1,1);
    results.splice(2,1);
    results.splice(3,1);
    res.json(results); // this is the results the [1] shows "affectedRows, inserID etc"
  })
})


router.get("/api/artist/:id", isAuthenticated, (req,res) => {
  const artistID = req.params.id;

  let sql = `CALL getArtistTopTracks(?); CALL getArtistDiscography(?);`;
  pool.query(sql, [artistID, artistID], (error, results) => {
    if (error) throw error;
    // remove affectedRows insertID array
    results.splice(1,1);
    results.splice(2,1);
    res.json(results); 
  })

})


router.get("/api/album/:id", (req,res) => {
  const {id} = req.params;

  let sql = `
  SELECT t.track_id, t.track_name, a.artist_name, a.artist_id, a.artist_picture_path, al.album_id, al.album_name, al.album_art_path, al.release_date, t.plays, t.duration
  FROM tracks t
  JOIN artists a ON a.artist_id = t.artist_id
  JOIN albums al ON t.album_id = al.album_id
  WHERE t.album_id = ?;
  `;

  pool.query(sql, [id], (error, results) => {
    if (error) {
      throw error;
    }

    res.json(results);
  })
})

router.get("/api/artist-discography/:id", (req,res) => {
  const {id} = req.params;

  let sql = `CALL getArtistDiscography(?);`
  pool.query(sql, [id], (error,results) => {
    if (error) {
      res.status(500).json({error: "there was an error"});
    }
    results.splice(1,1);
    res.json(results);
  })
})


module.exports = router;