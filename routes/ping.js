var express = require("express");
var router = express.Router();

/* GET ping listing. */
router.get("/", function (req, res, next) {
  res.status(200).send("Server is up!");
});

module.exports = router;
