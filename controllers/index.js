var path = require("path");
const eventModel = require("../models/events");

module.exports = function (req, res, next) {
  eventModel.find({date: { $gte: Date.now() }}, function (err, upcoming) {
    if (err) throw error;
    else {
      res.render("index", { event: upcoming });
    }
  });
};
