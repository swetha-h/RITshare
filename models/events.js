const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
  no: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: { type: String, unique: true, index: true },
  description: String,
  venue: String,
  date: Date,
  image_path: String,
});
const eventModel = mongoose.model("events", eventSchema);
module.exports = eventModel;
