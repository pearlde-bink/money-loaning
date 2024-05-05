const user = require("../models/Client");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

class UserController {
  async index(req, res) {
    res.render("userInfo", {
      style: "user.css",
    });
  }

  //register
  register(req, res) {
    res.render("./register/step1", {
      style: "step1.css",
    });
  }
  register2(req, res) {
    res.render("./register/step2", {
      style: "step2.css",
      script: "../../js/step2.js",
    });
  }
  register3(req, res) {
    res.render("./register/step3", {
      style: "step3.css",
    });
  }
  register4(req, res) {
    res.render("./register/step4", {
      style: "step4.css",
    });
  }
  register5(req, res) {
    res.render("./register/step5", {
      style: "step5.css",
    });
  }
  register6(req, res) {
    res.render("./register/step6", {
      style: "step6.css",
      script: "../../js/step6.js",
    });
  }

  async signUpPost(req, res, next) {
    try {
      const account = await user.findOne(req.body.sdtNumber);
      if (account) {
        return res.render("/register", {
          message: "Số điện thoại đã tồn tại!",
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
      const data = {
        name: req.body.name,
        sdt: req.body.sdtNumber,
        password: hashedPassword,
      };
      await user.add(data);
      res.redirect("/log-in");
    } catch (err) {
      next(err);
    }
  }

  async logInGet(req, res) {
    res.render("login", {
      style: "login.css",
    });
  }

  logout(req, res) {
    req.logout();
    res.redirect("/");
  }
  async edit(req, res) {
    res.render("userInfo", {
      style: "user.css",
    });
  }

  async editPost(req, res) {
    await user.updateOne({ sdt: req.body.sdt }, req.body);
    res.redirect("/");
  }
}

module.exports = new UserController();
