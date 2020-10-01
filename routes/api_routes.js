const express = require('express');

const router = express.Router();

router.get("/api/getSongs", (req,res) => {
  res.json()
})


module.exports = router;