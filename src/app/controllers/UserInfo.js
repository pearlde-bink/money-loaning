class UserController {
  index(req, res) {
    res.render("userInfo", {
      style: "user.css",
    });
  }
}

module.exports = new UserController();
