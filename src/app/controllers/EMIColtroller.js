class EMIController {
  index(req, res) {
    res.render("emi", {
      style: "emi.css",
      //   script: "../../js/emi.js",
      script: "../../../js/emi.js",
    });
  }
}

module.exports = new EMIController();
