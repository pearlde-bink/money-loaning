class PaymentController {
  index(req, res) {
    res.render("payment", {
      style: "payment.css",
    });
  }
}

module.exports = new PaymentController();
