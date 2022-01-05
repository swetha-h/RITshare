var path = require("path");
const clubModel = require("../models/club");

module.exports = {
  index: function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../public/clubs.html"));
  },
  getCreate: function (req, res, next) {
    res.render("clubsCreate");
  },
  postCreate: function (req, res, next) {
    const saveClub = new clubModel(req.body);
    saveClub.save((error, savedClub) => {
      if (error) throw error;
      res.json(savedClub);
    });
  },
};
