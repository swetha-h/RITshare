var express = require("express");
var router = express.Router();
var eventsController = require("../controllers/events");

router.get("/", eventsController.index);
router.get("/create", eventsController.getCreate);
router.post("/create", eventsController.postCreate);

module.exports = router;
