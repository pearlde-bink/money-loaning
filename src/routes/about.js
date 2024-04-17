const express = require("express");
const router = express.Router();

const AboutController = require("../app/controllers/AboutController");

router.get("/", AboutController.index);

module.exports = router;
