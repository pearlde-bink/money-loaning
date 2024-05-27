const Interest = require("../models/Interest");
const { multipleMongooseToObject } = require("../../util/mongoose");

class InterestController {
  async adjust(req, res) {
    try {
      const { amount, duration, interestRate } = req.body;
      const interest = await Interest.updateOne(
        { _id: req.params.id },
        { $set: { amount, duration, interestRate } }
      );

      if (interest.nModified > 0) {
        return res
          .status(200)
          .json({ success: true, message: "Adjust interest successfully" });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Adjust interest failed" });
      }
    } catch (e) {
      return res.status(500).json({ messege: e.message });
    }
  }
}

module.exports = new InterestController();
