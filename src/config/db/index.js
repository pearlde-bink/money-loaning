const { parseWithoutProcessing } = require("handlebars");
const mongoose = require("mongoose");

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
// module.exports = { connect };

// create schema
const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  // cccd: {
  //   type: String,
  //   require: true,
  //   // cccdNum: { type: String, require: true },
  //   // cccdFore: { type: String, require: true },
  //   // cccdSelfie: { type: String, require: true },
  //   // cccdBack: { type: String, require: true },
  // },
  // dob: { type: Date, require: true },
  sdt: { type: String, require: true },
  password: { type: String, require: true },
  // gender: { type: String, require: true },
  // email: { type: String, require: true },
  // marriageStatus: { type: String, require: true },
  // avatarLink: {
  //   type: String,
  //   default:
  //     "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
  //   unique: false,
  // },
  // slug: { type: String, unique: false, default: "" },
});

// const addressSchema = new mongoose.Schema({});

const collectionUser = new mongoose.model("clients", userSchema);

module.exports = collectionUser;
