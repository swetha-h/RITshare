const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

const clubSchema = mongoose.Schema({
  no: {
    type: Number,
    required:true,
    unique:true,
    index:true
  }, 
  name: String,   // String is shorthand for {type: String}
  description: String,
  deptNo: Number,
  leadUSN: String,
});

const clubModel = mongoose.model("club", clubSchema);
module.exports = clubModel;
