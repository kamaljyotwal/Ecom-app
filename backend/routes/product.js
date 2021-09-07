const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isUserAuthenticated, checkRole } = require("../middlewares/isAuthehticated")


router.route("/products").get(getProducts);
router.route("/products/:id").get(getOneProduct);
router.route("/admin/products/new").post(isUserAuthenticated, checkRole('admin'), newProducts);
router.route("/admin/products/:id").put(isUserAuthenticated, checkRole('admin'), updateProduct);
router.route("/admin/products/:id").delete(isUserAuthenticated, checkRole('admin'), deleteProduct);

module.exports = router;
