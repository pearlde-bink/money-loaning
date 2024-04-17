const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/bink_edu_dev", {
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
