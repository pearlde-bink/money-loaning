const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Workplace = new mongoose.Schema({
  client_Id: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  workField: { type: String, require: true },
  company: { type: String, require: true },
  role: { type: String, require: true },
  exprerience: { type: String, require: true },
  salary: { type: String, require: true },
});

module.exports.Workplace = mongoose.model("Workplace", Workplace);
