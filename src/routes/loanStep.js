const express = require("express");
const router = express.Router();

const loanStepController = require("../app/controllers/LoanStepController");

router.get("/", loanStepController.index);

module.exports = router;
