const mongoose = require("mongoose");
const buildDataSchema = new mongoose.Schema({ type: Map, of: Object });

const Built_Data = mongoose.model("builds", buildDataSchema);
module.exports = Built_Data;
