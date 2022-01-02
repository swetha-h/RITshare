var express = require('express');
var router = express.Router();

var clubsController = require('../controllers/clubs')

router.get('/', clubsController);

module.exports = router;
