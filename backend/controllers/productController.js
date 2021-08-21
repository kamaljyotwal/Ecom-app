const product = require("../modals/product");

// create new product => api/v1/products/new
exports.newProducts = async (req, res, next) => {
  const prod = await product.create(req.body);
  res.status(201).json({
    success: true,
    data: prod,
  });
};

// dummy get req.
exports.getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "message string",
  });
};
