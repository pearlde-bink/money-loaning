const express = require("express");
const router = express.Router();

const paymentController = require("../app/controllers/PaymentController");

router.delete("/:id", paymentController.delete);
router.get("/", paymentController.index);

module.exports = router;
