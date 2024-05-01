const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Client = new Schema(
  {
    name: { type: String, require: true },
    cccd: { type: String, require: true },
    dob: { type: Date, require: true },
    gender: { type: String },
    marriageStatus: { type: String, require: true },
    email: { type: String, require: true },
    city: { type: String, require: true },
    province: { type: String, require: true },
    district: { type: String, require: true },
    commune: { type: String, require: true },
    street: { type: String, require: true },
    address: { type: String, require: true },
    stayPeriod: { type: String, require: true },
    paymentMethod: { type: String, require: true },
    loanPurpose: { type: String, require: true },
    cccdFore: { type: String, require: true },
    cccdSelfie: { type: String, require: true },
    cccdBack: { type: String, require: true },
    slug: { type: String, default: "Le Van B" },
  },
  {
    // add createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", Client);
