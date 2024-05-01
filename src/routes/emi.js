const express = require("express");
const router = express.Router();

const emiController = require("../app/controllers/EMIColtroller");

router.get("/", emiController.index);

module.exports = router;
