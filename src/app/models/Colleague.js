const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Colleague = new Schema({
  client_Id: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  colleagueName: { type: String, require: true },
  colleaguePhone: { type: String, require: true },
});

module.exports = mongoose.model("Colleague", Colleague);
