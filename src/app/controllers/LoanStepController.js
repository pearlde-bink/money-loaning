class LoanStepController {
  index(req, res) {
    res.render("loanStep", {
      style: "loanStep.css",
    });
  }
}
module.exports = new LoanStepController();
