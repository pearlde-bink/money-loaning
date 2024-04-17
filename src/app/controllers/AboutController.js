class AboutController {
  index(req, res) {
    res.render("about", {
      style: "about.css",
    });
  }
}

module.exports = new AboutController();
