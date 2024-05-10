const Client = require("../models/Client");
const { multipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  // GET /home
  async home(req, res, next) {
    // res.render('home');
    try {
      const client = await Client.findOne({});
      res.render("home", {
        style: "app.css",
        client: client ? multipleMongooseToObject(client) : null,
      });
    } catch (err) {
      next(err);
    }
  }

  // GET /news/:slug
  // home(req, res) {
  //   res.send("search");
  // }
}

module.exports = new SiteController();
