const express = require("express");
const router = express.Router();

const registerController = require("../app/controllers/RegisterController");

router.get("/step6", registerController.step6);
router.get("/step5", registerController.step5);
router.get("/step4", registerController.step4);
router.get("/step3", registerController.step3);
router.get("/step2", registerController.step2);
router.get("/", registerController.index);

module.exports = router;
