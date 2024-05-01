const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Colleague = new Schema({
  name: { type: String, require: true },
  phone: { type: String, require: true },
});

module.exports = mongoose.model("Colleague", Colleague);
