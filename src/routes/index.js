const aboutRouter = require("./about");
const siteRouter = require("./site");
const newsRouter = require("./news");
const loanStepRouter = require("./loanStep");
const questionRouter = require("./question");
const paymentRouter = require("./payment");
const emiRouter = require("./emi");
const userRouter = require("./user");
const loanRouter = require("./loan");
const adminRouter = require("./admin");
const interestRouter = require("./interest");

function route(app) {
  app.use("/interest", interestRouter);
  app.use("/admin", adminRouter);
  app.use("/loan", loanRouter);
  app.use("/user", userRouter);
  app.use("/emi", emiRouter);
  app.use("/payment", paymentRouter);
  app.use("/question", questionRouter);
  app.use("/loan-step", loanStepRouter);
  app.use("/news", newsRouter);
  app.use("/about", aboutRouter);
  app.use("/", siteRouter);
}

module.exports = route;
