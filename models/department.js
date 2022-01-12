const mongoose = require("mongoose");

const deptSchema = mongoose.Schema({
  deptNo: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  deptName: String, // String is shorthand for {type: String}
});

const deptModel = mongoose.model("dept", deptSchema);
module.exports = deptModel;
