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


module.exports = router;