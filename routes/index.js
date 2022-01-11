var express = require("express");
var router = express.Router();
var indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.dummy);
router.get("/loggedin", indexController.loggedin);

module.exports = router;
