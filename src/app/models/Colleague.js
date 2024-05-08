const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Colleague = new mongoose.Schema({
  client_Id: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  name: { type: String, require: true },
  phone: { type: String, require: true },
});

module.exports.Colleague = mongoose.model("Colleague", Colleague);
