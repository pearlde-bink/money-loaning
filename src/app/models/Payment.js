const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Payment = new mongoose.Schema({
  client_Id: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    require: true,
  },
  paymentMethod: {
    bank: {
      bankName: { type: String, require: true },
      stk: { type: String, require: true },
    },
    momo: {
      momoNumber: { type: String, require: true },
    },
  },
});
module.exports.Payment = mongoose.model("Payment", Payment);
