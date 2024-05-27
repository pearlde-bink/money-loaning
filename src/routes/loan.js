const express = require("express");
const router = express.Router();

const loanController = require("../app/controllers/LoanController");

router.get("/request", loanController.requestLoan);
router.post("/confirm/:id", loanController.confirmLoan);
router.get("/:id", loanController.index);

module.exports = router;
