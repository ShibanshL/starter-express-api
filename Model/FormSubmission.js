const mongoose = require("mongoose");
const formSubchema = new mongoose.Schema({
  sub: { type: Map, of: Object },
});

const form_sub_Data = mongoose.model("Subs", formSubchema);
module.exports = form_sub_Data;
