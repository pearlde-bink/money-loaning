const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Payment = new Schema({
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

module.exports = mongoose.model("Payment", Payment);
