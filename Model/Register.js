const mongoose = require("mongoose");
const registerDataSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
  },
  { versionKey: false }
);

const registerData = mongoose.model("registers", registerDataSchema);
module.exports = registerData;
