const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Payment = new Schema({
  client_Id: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  // paymentMethod: {
  //   bank: {
  bankName: { type: String, require: true },
  bankNum: { type: String, require: true },
  // },
  // momo: {
  momoNumber: { type: String, require: false },
  //   },
  // },
});

module.exports = mongoose.model("Payment", Payment);
