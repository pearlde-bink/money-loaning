const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Relatives = new Schema({
  client_Id: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  relativesName: { type: String, require: true },
  relativesType: { type: String, require: true },
  RelativesPhone: { type: String, require: true },
});

module.exports = mongoose.model("Relatives", Relatives);
