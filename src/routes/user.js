var express = require("express");
var router = express.Router();

const UserController = require("../app/controllers/UserInfo");

router.get("/", UserController.index);

module.exports = router;
