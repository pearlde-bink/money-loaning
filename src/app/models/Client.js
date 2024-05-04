const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Client = new Schema(
  {
    name: { type: String, require: true },
    sdt: { type: String, require: true },
    email: { type: String, require: true },
    dob: { type: Date, require: true },
    gender: { type: String, require: true },
    marriageStatus: { type: String, require: true },
    cccd: {
      cccdNum: { type: String, require: true },
      cccdFore: { type: String, require: true },
      cccdSelfie: { type: String, require: true },
      cccdBack: { type: String, require: true },
    },
    avatarLink: {
      type: String,
      default:
        "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
      unique: false,
    },
    slug: { type: String, default: "", unique: false },
  },
  {
    // add createdAt and updatedAt fields
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", Client);
