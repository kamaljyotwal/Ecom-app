const express = require("express");
const router = express.Router();

const {
  newOrder,
  deleteOrder,
  getSingleOrder,
  getAllOrdersByUser,
  adminAllOrders,
  updateOrder,
} = require("../controllers/orderController");
const { isUserAuthenticated, checkRole } = require("../middlewares/isAuthehticated");

router.route("/newOrder").post(isUserAuthenticated, newOrder);
router.route("/delete/:id").delete(isUserAuthenticated, deleteOrder);
router.route("/me").get(isUserAuthenticated, getAllOrdersByUser);
router.route("/:id").get(isUserAuthenticated, getSingleOrder);
router.route("/admin/allOrders").get(isUserAuthenticated, checkRole("admin"), adminAllOrders);
router.route("/admin/updateOrder/:id").put(isUserAuthenticated, checkRole("admin"), updateOrder);
module.exports = router;
