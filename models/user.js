const mongoose = require("mongoose");
passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      length: 10,
    },
    
  },
  { collection: "users" }
);
UserSchema.plugin(passportLocalMongoose);
const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
