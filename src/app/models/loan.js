const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Loan = new Schema(
  {
    client_Id: {
      type: Schema.Types.ObjectId,
      ref: "clients",
      require: true,
    },
    loanAmount: { type: Number, require: true },
    loanPayday: { type: Number, require: true },
    loanTotal: { type: Number, require: true },
    isPaid: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports.Loan = mongoose.model("Loan", Loan);
