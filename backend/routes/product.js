const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getOneProduct);

router.route("/admin/products/new").post(newProducts);
router.route("/admin/products/:id").put(updateProduct);
router.route("/admin/products/:id").delete(deleteProduct);

module.exports = router;
