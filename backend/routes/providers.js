var express = require('express');
var router = express.Router();
const data = require('../data/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(data.providers);
});

module.exports = router;
