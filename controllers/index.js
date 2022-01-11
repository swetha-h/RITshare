var path = require("path");
const eventModel = require("../models/events");
const clubModel = require("../models/club");

module.exports = {
  dummy: function (req, res, next) {
    res.render("index");
  },

  loggedin: function (req, res, next) {
    let clubs = clubModel.find({}).exec();
    eventModel.find({ date: { $gte: Date.now() } }, function (err, upcoming) {
      if (err) throw error;
      else {
        res.render("loggedin", { event: upcoming, club: clubs });
      }
    });
  },
};
