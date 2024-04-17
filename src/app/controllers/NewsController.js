class NewsController {
  index(req, res) {
    res.render("news", {
      style: "news.css",
    });
  }
}

module.exports = new NewsController();
