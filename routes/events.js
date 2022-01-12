var express = require("express");
var router = express.Router();
var eventsController = require("../controllers/events");

router.get("/", eventsController.index);
router.get("/create", eventsController.getCreate);
router.post("/create", eventsController.postCreate);

router.get("/delete", eventsController.getDelete);
router.post("/delete", eventsController.postDelete);

module.exports = router;
