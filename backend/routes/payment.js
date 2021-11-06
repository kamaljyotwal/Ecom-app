const express = require("express");
const router = express.Router();

const { processPayment, sendStripApi } = require("../controllers/paymentController");
const { isUserAuthenticated } = require("../middlewares/isAuthehticated");

router.route("/payment/process").post(isUserAuthenticated, processPayment);
router.route("/stripeapi").get(isUserAuthenticated, sendStripApi);

module.exports = router;
