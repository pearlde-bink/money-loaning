const Relative = require("../models/Relatives");
const { multipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  // GET /home
  home(req, res, next) {
    // res.render('home');
    Relative.find({})
      .then((relatives) =>
        res.render("home", {
          style: "app.css",
          relatives: multipleMongooseToObject(relatives),
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
