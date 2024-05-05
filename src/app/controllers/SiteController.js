const Client = require("../models/Client");
const { multipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  // GET /home
  home(req, res, next) {
    // res.render('home');
    Client.find({})
      .then((workplace) =>
        res.render("home", {
          style: "app.css",
          workplace: multipleMongooseToObject(workplace),
        })
      )
      .catch(next);
  }
  // home(req, res, next) {
  //   res.render("home", {
  //     style: "app.css",
  //   });
  // }

  // GET /news/:slug
  // home(req, res) {
  //   res.send("search");
  // }
}

module.exports = new SiteController();
