var express = require('express');
var router = express.Router();
var eventsController = require('../controllers/clubs')

router.get('/', eventsController);

module.exports = router;
