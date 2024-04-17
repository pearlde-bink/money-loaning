class QuestionController {
  index(req, res) {
    res.render("question", {
      style: "question.css",
    });
  }
}

module.exports = new QuestionController();
