const Client = require("../models/Client");
const Interest = require("../models/Interest");
const Loan = require("../models/Loan");
const PayMethod = require("../models/PayMethod");
const News = require("../models/News");
const { multipleMongooseToObject } = require("../../util/mongoose");
class AdminController {
  async index(req, res, next) {
    try {
      const client = await Client.find({});
      const interest = await Interest.find({});
      const loans = await Loan.find({})
        .select(
          "loanAmount loanRequest loanPayday loanTotal isPaid client_Id pending"
        ) // Fields to select from Loan model
        .populate("client_Id", "name")
        .exec(); // Formatting data to fit the template
      const formattedLoans = loans.map((loan) => ({
        _id: loan._id,
        name: loan.client_Id ? loan.client_Id.name : "Unknown Client",
        loanAmount: loan.loanAmount,
        loanRequest: loan.loanRequest,
        loanPayday: loan.loanPayday,
        loanTotal: loan.loanTotal,
        isPaid: loan.isPaid,
        pending: loan.pending,
      }));
      const paymethod = await PayMethod.find({});
      const news = await News.find({});
      res.render("admin", {
        style: "admin.css",
        script: "../../../js/admin.js",
        client: client ? multipleMongooseToObject(client) : null,
        interest: interest ? multipleMongooseToObject(interest) : null,
        loan: formattedLoans,
        paymethod: paymethod ? multipleMongooseToObject(paymethod) : null,
        news: news ? multipleMongooseToObject(news) : null,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
