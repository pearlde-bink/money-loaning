const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Interest = new Schema({
  amount: { type: Number, require: true },
  duration: { type: Number, require: true },
  interestRate: { type: Number, require: true },
});

module.exports = mongoose.model("Interest", Interest);
