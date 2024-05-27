const { parseWithoutProcessing } = require("handlebars");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/moneyLoaning", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("connect succesfully");
  } catch (error) {
    console.log("failed connection");
    console.log(error);
  }
}

module.exports = { connect };
