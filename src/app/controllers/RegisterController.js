class RegisterController {
  index(req, res) {
    res.render("./register/step1", {
      style: "step1.css",
    });
  }
  step2(req, res) {
    res.render("./register/step2", {
      style: "step2.css",
      script: "../../js/step2.js",
    });
  }
  step3(req, res) {
    res.render("./register/step3", {
      style: "step3.css",
    });
  }
  step4(req, res) {
    res.render("./register/step4", {
      style: "step4.css",
    });
  }
  step5(req, res) {
    res.render("./register/step5", {
      style: "step5.css",
    });
  }
  step6(req, res) {
    res.render("./register/step6", {
      style: "step6.css",
      script: "../../js/step6.js",
    });
  }
}

module.exports = new RegisterController();
