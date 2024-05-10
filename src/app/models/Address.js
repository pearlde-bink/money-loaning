const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Address = new Schema({
  client_Id: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  province: { type: String, require: true },
  district: { type: String, require: true },
  village: { type: String, require: true },
  street: { type: String, require: true },
  homeAddress: { type: String, require: true },
  stayPeriod: { type: String, require: true },
});

module.exports = mongoose.model("Address", Address);
