const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PayMethod = new Schema({
  method: { type: String, require: true },
});

module.exports = mongoose.model("PayMethod", PayMethod);

/*
{
  "method": "sjasd",
}
*/
