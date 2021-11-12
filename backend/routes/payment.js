const express = require("express");
const router = express.Router();

const { processPayment, sendStripApi } = require("../controllers/paymentController");
const { isUserAuthenticated } = require("../middlewares/isAuthehticated");

router.route("/stripeapi").get(sendStripApi);
router.route("/payment/process").post(isUserAuthenticated, processPayment);

module.exports = router;
