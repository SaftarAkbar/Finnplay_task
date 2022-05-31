var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('I am index. Go to /games, /game-groups or /providers to see the data');
});

module.exports = router;
