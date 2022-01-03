var express = require("express");
var router = express.Router();
var eventsController = require("../controllers/events");

router.get("/", eventsController);

module.exports = router;
