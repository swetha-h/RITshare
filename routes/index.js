var express = require("express");
var router = express.Router();
var indexController = require("../controllers/index");
var middleWare=require("./middleware");

/* GET home page. */
router.get("/", indexController.dummy);
router.get("/loggedin", middleWare.restrictMiddleware,indexController.loggedin);

module.exports = router;
