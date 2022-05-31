var express = require('express');
var router = express.Router();
const data = require('../data/data')


router.get('/', function(req, res, next) {
  let games = data.games;

  const groups = data.groups;

  let allGroupedGameIds = []
  
  groups.forEach((group)=>{
    allGroupedGameIds.push(...group.games);
  });

  const groupedGames = games.filter(game => allGroupedGameIds.includes(game.id))

  res.send(groupedGames);
  
});

module.exports = router;
