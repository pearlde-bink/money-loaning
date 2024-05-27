const Client = require("../models/Client");
const { multipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  async home(req, res, next) {
    try {
      const client = await Client.find({});
      res.render("home", {
        style: "app.css",
        client: client ? multipleMongooseToObject(client) : null,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SiteController();
