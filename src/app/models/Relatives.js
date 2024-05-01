const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Relatives = new Schema({
  name: { type: String, require: true },
  relationship: { type: String, require: true },
  phone: { type: String, require: true },
});

module.exports = mongoose.model("Relatives", Relatives);
