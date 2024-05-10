var express = require("express");
var router = express.Router();
const passport = require("passport");

const UserController = require("../app/controllers/UserController");

router.post("/register", UserController.createUser);
router.get("/register", UserController.indexRegister);
router.post("/logIn", UserController.logIn);
router.get("/logIn", UserController.indexLogIn);
router.get("/", UserController.getUser);

module.exports = router;
