const productSchema = require("../modals/product");

// create new product => api/v1/admin/products/new
exports.newProducts = async (req, res, next) => {
  const prod = await productSchema.create(req.body);
  res.status(201).json({
    success: true,
    data: prod,
  });
};

// get all products in db =>api/v1/products
exports.getProducts = async (req, res, next) => {
  try {
    const alldata = await productSchema.find();

    res.status(200).json({
      sucess: true,
      length: alldata.length,
      data: alldata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured",
    });
  }
};

// find & get one product => api/v1/products/:id

exports.getOneProduct = async (req, res) => {
  const dataFound = await productSchema.findById(req.params.id);

  if (!dataFound) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
  res.status(200).json({ success: true, data: dataFound });
};

// update product => api/v1/admin/products/:id
exports.updateProduct = async (req, res, next) => {
  let dataFound = await productSchema.findById(req.params.id);
  if (!dataFound) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
  let dataFound1 = await productSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: dataFound1,
  });
};

// delete product => api/v1/admin/products/:id
exports.deleteProduct = async (req, res) => {
  const found = await productSchema.findByIdAndDelete(req.params.id);
  if (!found) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: `product with id: ${req.params.id} deleted successfully`,
  });
};
