var path = require("path");
const clubModel = require("../models/club");
const eventModel = require("../models/events");

const clubEventModel = mongoose.model("clubEvent", clubEventSchema);
module.exports = clubEventModel;

//needs to connect club and events so as to show only the events of that particular club when
// club card is expanded(more button)
