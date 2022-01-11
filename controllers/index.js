var path = require("path");
const eventModel = require("../models/events");
const clubModel = require("../models/club");

module.exports = {
  dummy: function (req, res, next) {
    res.render("index");
  },

  loggedin: async function (req, res, next) {
    let clubsLead = await clubModel.find({}, { leadUSN: 1 }).exec();
    eventModel.find({ date: { $gte: Date.now() } }, function (err, upcoming) {
      if (err) throw error;
      else {
        res.render("loggedin", {
          event: upcoming,
          isTeamLead: clubsLead.find(
            (record) => record.leadUSN == req.query.usn
          ),
        });
      }
    });
  },
};
