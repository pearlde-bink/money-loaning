const News = require("../models/News");
const {
  multipleMongooseToObject,
  singleMongooseToObject,
} = require("../../util/mongoose");

class NewsController {
  async index(req, res, next) {
    try {
      const news = await News.find({});
      res.render("news", {
        style: "news.css",
        news: news ? multipleMongooseToObject(news) : null,
      });
    } catch (err) {
      next(err);
    }
  }
  async show(req, res, next) {
    try {
      const newsItem = await News.findById(req.params.id);
      const news = await News.find({ _id: { $ne: req.params.id } });
      res.render("newsDetail", {
        style: "newsDetail.css",
        newsItem: singleMongooseToObject(newsItem),
        news: multipleMongooseToObject(news),
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await News.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "News item deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = new NewsController();
