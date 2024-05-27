const Payment = require("../models/PayMethod");
const { multipleMongooseToObject } = require("../../util/mongoose");
class PaymentController {
  index(req, res) {
    res.render("payment", {
      style: "payment.css",
    });
  }

  async delete(req, res, next) {
    try {
      await Payment.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Payment deleted successfully!" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PaymentController();
