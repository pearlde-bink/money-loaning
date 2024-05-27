// MainController.js
const Client = require("../models/Client");
const { singleMongooseToObject } = require("../../util/mongoose");

class MainController {
  async renderMainPage(req, res, next) {
    // console.log(req.session.userId);
    try {
      // Fetch user data or retrieve it from session
      const user = await Client.findById(req.session.userId);

      res.render("main", {
        user: singleMongooseToObject(user), // Convert to plain object if it's a Mongoose document
      });
    } catch (err) {
      next(err);
    }
  }
}
