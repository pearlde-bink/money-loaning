// const { multipleMongooseToObject } = require("../../util/mongoose");
// const PayMethod = require("../models/PayMethod");
class EMIController {
  index(req, res) {
    res.render("emi", {
      style: "emi.css",
      script: "../../../js/emi.js",
    });
  }
  // async index(req, res, next) {
  //   try {
  //     const paymethod = await PayMethod.find({});
  //     res.render("emi", {
  //       style: "emi.css",
  //       script: "../../../js/emi.js",
  //       paymethod: multipleMongooseToObject(paymethod),
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}

module.exports = new EMIController();
