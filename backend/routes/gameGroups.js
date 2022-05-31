var express = require('express');
var router = express.Router();
const data = require('../data/data')


router.get('/', function (req, res, next) {

  res.send(data.groups);
});

router.post('/', function (req, res, next) {
  const newGameGroup = req.body;

  if (newGameGroup) {
    data.groups.push(newGameGroup)
    res.send(data.groups)
  } else {
    res.send("Request body is empty")
  }
});

router.patch('/:id', function (req, res, next) {
  const groupId = req.params.id;
  const updateData = req.body;

  if ((!groupId) || (!updateData)) {
    res.send("Data is missing")
  } else {

    const objIndex = data.groups.findIndex(obj => obj.id==groupId);

    if (objIndex){
      data.groups[objIndex]= {...data.groups[objIndex],...updateData}
      res.send(data.groups)
    } else {
      res.status(404).send("Object with this id doesn't exist")
    }

  }
});


router.delete('/:id', function (req, res, next) {
  const groupId = req.params.id;

  if (!groupId) {
    res.send("Id is missing")
  } else {

    const objIndex = data.groups.findIndex(obj => obj.id==groupId);

    if (objIndex>-1){
      data.groups.splice(objIndex,1)
      res.send(data.groups)
    } else {
      res.status(404).send("Object with this id doesn't exist")
    }

  }
});

module.exports = router;
