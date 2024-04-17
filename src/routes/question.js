const express = require("express");
const router = express.Router();

const questionController = require("../app/controllers/QuestionController");

router.get("/", questionController.index);

module.exports = router;
