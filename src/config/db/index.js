const { parseWithoutProcessing } = require("handlebars");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// async function connect() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/moneyLoaning", {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//     });
//     console.log("connect succesfully");
//   } catch (error) {
//     console.log("failed connection");
//     console.log(error);
//   }
// }

const connect = mongoose.connect("mongodb://localhost:27017/moneyLoaning");
connect
  .then(() => {
    console.log("connected succesfully");
  })
  .catch((error) => {
    console.log("failed connection");
    console.log(error);
  });
// module.exports.connect = { connect };

// create schema
const userSchema = new mongoose.Schema({
  // client_id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, require: true },
  cccd: {
    type: String,
    require: true,
    // cccdNum: { type: String, require: true },
    // cccdFore: { type: String, require: true },
    // cccdSelfie: { type: String, require: true },
    // cccdBack: { type: String, require: true },
  },
  dob: { type: Date, require: true },
  sdt: { type: String, require: true },
  password: { type: String, require: true },
  gender: { type: String, require: true },
  email: { type: String, require: true },
  marriageStatus: { type: String, require: true },
  avatarLink: {
    type: String,
    default:
      "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
    unique: false,
  },
  slug: { type: String, unique: false, default: "" },
});

// const Address = new mongoose.Schema({
//   // address_id: { type: Schema.Types.ObjectId, auto: true },
//   client_Id: {
//     type: Schema.Types.ObjectId,
//     ref: "clients",
//     require: true,
//   },
//   province: { type: String, require: true },
//   district: { type: String, require: true },
//   village: { type: String, require: true },
//   street: { type: String, require: true },
//   homeAddress: { type: String, require: true },
//   stayPeriod: { type: String, require: true },
// });

// const Workplace = new mongoose.Schema({
//   // workplace_id: { type: Schema.Types.ObjectId, auto: true },
//   client_Id: {
//     type: Schema.Types.ObjectId,
//     ref: "clients",
//     require: true,
//   },
//   workField: { type: String, require: true },
//   company: { type: String, require: true },
//   role: { type: String, require: true },
//   exprerience: { type: String, require: true },
//   salary: { type: String, require: true },
// });

// const Relatives = new mongoose.Schema({
//   // relatives_id: { type: Schema.Types.ObjectId, auto: true },
//   client_Id: {
//     type: Schema.Types.ObjectId,
//     ref: "clients",
//     require: true,
//   },
//   name: { type: String, require: true },
//   relationship: { type: String, require: true },
//   phone: { type: String, require: true },
// });

// const Payment = new mongoose.Schema({
//   // payment_id: { type: Schema.Types.ObjectId, auto: true },
//   client_Id: {
//     type: Schema.Types.ObjectId,
//     ref: "clients",
//     require: true,
//   },
//   paymentMethod: {
//     bank: {
//       bankName: { type: String, require: true },
//       stk: { type: String, require: true },
//     },
//     momo: {
//       momoNumber: { type: String, require: true },
//     },
//   },
// });

// const Colleague = new mongoose.Schema({
//   // colleague_id: { type: Schema.Types.ObjectId, auto: true },
//   client_Id: {
//     type: Schema.Types.ObjectId,
//     ref: "clients",
//     require: true,
//   },
//   name: { type: String, require: true },
//   phone: { type: String, require: true },
// });

const clients = mongoose.model("clients", userSchema);
// const addresses = mongoose.model("addresses", Address);
// const workplaces = mongoose.model("workplaces", Workplace);
// const relatives = mongoose.model("relatives", Relatives);
// const payments = mongoose.model("payments", Payment);
// const colleagues = mongoose.model("colleagues", Colleague);

// module.exports.colleagues = colleagues;
// module.exports.payments = payments;
// module.exports.relatives = relatives;
// module.exports.workplaces = workplaces;
// module.exports.addresses = addresses;
module.exports.clients = clients;
