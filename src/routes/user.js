var express = require("express");
var router = express.Router();
const passport = require("passport");

const UserController = require("../app/controllers/UserInfo");

router.post("/", UserController.editPost);
router.get("/", UserController.edit);
// router.get("/info", UserController.);
router.get("/logout", UserController.logout);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
router.get("/login", UserController.logInGet);
router.get("/register", UserController.register);
router.post("/register", UserController.signUpPost);
router.get("/", UserController.index);

module.exports = router;
