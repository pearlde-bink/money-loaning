const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Loan = new Schema(
  {
    client_Id: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      require: true,
    },
    loanAmount: { type: Number, require: true },
    loanPayday: { type: Date, require: true },
    loanTotal: { type: Number, require: true },
    loanRequest: { type: Date, require: true },
    isPaid: { type: Boolean, required: true, default: false },
    pending: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan", Loan);
