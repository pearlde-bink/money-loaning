const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin = new Schema({
  name: { type: String, require: true },
  cccd: { type: String, require: true },
  email: { type: String, require: true },
  salary: { type: Number, require: true },
  phone: { type: String, require: true },
});

module.exports = mongoose.model("Admin", Admin);
