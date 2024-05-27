const Loan = require("../models/Loan");
const {
  multipleMongooseToObject,
  singleMongooseToObject,
} = require("../../util/mongoose");

class LoanController {
  async index(req, res) {
    // res.render("loan", {
    //   style: "loan.css",
    //   loan: singleMongooseToObject(loan),
    // });
    try {
      const loan = await Loan.findById(req.params.id);
      if (!loan) {
        return res.status(404).send("No loan found");
      }
      res.render("loan", {
        style: "loan.css",
        loan: singleMongooseToObject(loan),
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
  async confirmLoan(req, res) {
    try {
      const confirm_loan = await Loan.updateOne(
        { _id: req.params.id },
        { $set: { pending: false } }
      );

      console.log("Update result:", confirm_loan);
      if (confirm_loan.nModified > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Confirm loan successfully" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Confirm loan failed" });
      }
    } catch (e) {
      return res.status(500).json({ messege: e.message });
    }
  }

  async requestLoan(req, res) {
    try {
      // const request_loan = req.body;
      res.render("requestLoan", {
        style: "requestLoan.css",
        script: "requestLoan.js",
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new LoanController();
