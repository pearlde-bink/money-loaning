// const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  // GET /home
  //   home(req, res, next) {
  //     // res.render('home');
  //     Course.find({})
  //       .then((courses) => {
  //         res.render("home", { courses: multipleMongooseToObject(courses) });
  //       })
  //       .catch(next);
  //   }
  home(req, res, next) {
    res.render("home", {
      style: "app.css",
    });
  }

  // GET /news/:slug
  // home(req, res) {
  //   res.send("search");
  // }
}

module.exports = new SiteController();
