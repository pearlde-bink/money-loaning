const express = require("express");
const router = express.Router();

const interestController = require("../app/controllers/InterestController");

router.post("/adjust/:id", interestController.adjust);

module.exports = router;
