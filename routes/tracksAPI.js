const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const pool = require("../db");



router.post("/api/tracks/search", isAuthenticated ,(req,res) => {
  const {search} = req.body;

  let sql = `CALL searchMusic(?, @songs); SELECT @songs;`;
  pool.query(sql, search, (error, fields) => {
    if (error) throw error;
    res.json(fields)
  })

  // res.json({search: search});
})


module.exports = router;