const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// const { connect } = require("../config/db");
const SALT_ROUNDS = 10;
const bcrypt = require("bcrypt");
const collection = require("../../config/db");

const Client = new Schema(
  {
    client_id: { type: Schema.Types.ObjectId, auto: true },
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
    slug: { type: String, default: "hi", unique: false },
  },
  {
    // add createdAt and updatedAt fields
    timestamps: true,
  }
);

const detail = async (id) => {
  const results = await collection.find({ _id: ObjectId(id) }).toArray();
  return results[0];
};
exports.detail = detail;

module.exports.list = async () => {
  return (results = await collection.find({}).toArray());
};

module.exports.add = async (user) => {
  return await collection.insertOne(user);
};

const get = async (sdt) => {
  return await collection.findOne({ sdt: sdt });
};
exports.get = get;

exports.verify = async (sdt, password) => {
  const user = collection.findOne({ sdt: sdt });
  if (user) {
    return undefined;
    //verify password
    //...
  }
  return results[0];
};

exports.validPassword = async (sdt, password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await get(sdt);

  if (!user) return false;
  return await bcrypt.compare(password, user.password);
};

const check = async (sdt) => {
  const user = await collection.findOne({ sdt: sdt });
  if (user) return true;
  return false;
};

exports.check = check;

module.exports.update = async (sdt, user) => {
  return await collection.updateOne({ sdt: sdt }, { $set: user });
};

module.exports.Client = mongoose.model("Client", Client);
