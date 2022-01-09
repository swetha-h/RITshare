var path = require("path");
const clubModel = require("../models/club");

module.exports = {
  index: function (req, res, next) {
    let clubs = clubModel.find({}, function (err, clubs) {
      if (err) throw error;
      else {
        //clublist=json(clubs);
        res.render("clubs", { clubs: clubs });
      }
    });
  },
  getCreate: function (req, res, next) {
    res.render("clubsCreate");
  },
  postCreate: function (req, res, next) {
    const saveClub = new clubModel(req.body);
    saveClub.save((error, savedClub) => {
      if (error) {
        res.header("Content-Type", "application/json");
        res.status(500).send(JSON.stringify(error, null, 4));
      }
      res.json(savedClub);
    });
  },
};
