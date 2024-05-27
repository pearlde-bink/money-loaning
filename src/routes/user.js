var express = require("express");
var router = express.Router();
const passport = require("passport");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

const UserController = require("../app/controllers/UserController");

router.get("/getUnblock", UserController.getUnblocked);
router.get("/getBlock", UserController.getBlocked);
router.post("/block/:id", UserController.updateBlock);
router.post("/unblock/:id", UserController.unBlock);
router.post("/delete/:id", UserController.deleteUser);
router.delete("/deleteMany", authUserMiddleWare, UserController.deleteManyUser);
router.get("/getAll", UserController.getAllUser);
router.get("/getDetail/:id", UserController.getDetailsUser);
router.put("/updateUser/:id", UserController.updateUser);
router.post("/register", UserController.createUser);
router.get("/register", UserController.indexRegister);
router.post("/logIn", UserController.logIn);
router.get("/logIn", UserController.indexLogIn);
router.post("/logout", UserController.logoutUser);
router.get("/logout", UserController.logoutUser);
// router.post("/:id", authUserMiddleWare, UserController.updateUser);
router.get("/getUser/:id", UserController.getUser); //giong getDetail

module.exports = router;
