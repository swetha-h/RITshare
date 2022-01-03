const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  no: Number, // String is shorthand for {type: String}
  name: String,
  description: String,
  deptNo: Number,
  leadUSN: String,
});
const clubModel = mongoose.model("club", clubSchema);
module.exports = clubModel;
