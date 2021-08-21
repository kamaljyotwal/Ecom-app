const express = require("express");
const router = express.Router();

const { getProducts, newProducts } = require("../controllers/productController");

router.route("/products").get(getProducts);
router.route("/products/new").post(newProducts);

module.exports = router;
