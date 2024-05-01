const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Workplace = new Schema({
  workField: { type: String, require: true },
  company: { type: String, require: true },
  role: { type: String, require: true },
  exprerience: { type: String, require: true },
  salary: { type: Number, require: true },
});

module.exports = mongoose.model("Workplace", Workplace);
