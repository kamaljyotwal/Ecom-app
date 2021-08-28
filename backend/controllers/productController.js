const productSchema = require("../modals/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures")


// create new product => api/v1/admin/products/new
exports.newProducts = catchAsyncErrors(async (req, res, next) => {
  const prod = await productSchema.create(req.body);
  res.status(201).json({
    success: true,
    data: prod,
  });
});

// get all products in db =>api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

  const resPerPage = 3;
  const api3 = new APIFeatures(productSchema.find(), req.query).search().filter().pagination(resPerPage)
  // const alldata = await productSchema.find();
  const alldata = await api3.query;

  res.status(200).json({
    sucess: true,
    length: alldata.length,
    data: alldata,
  });
});


// find & get one product => api/v1/products/:id
exports.getOneProduct = catchAsyncErrors(async (req, res, next) => {
  const dataFound = await productSchema.findById(req.params.id);

  if (!dataFound) {
    return next(new ErrorHandler("product is not found in db", 404));
  }
  res.status(200).json({ success: true, data: dataFound });
});

// update product => api/v1/admin/products/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let dataFound = await productSchema.findById(req.params.id);
  if (!dataFound) {
    return next(new ErrorHandler("product is not found in db", 404));
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
});

// delete product => api/v1/admin/products/:id
exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  const found = await productSchema.findByIdAndDelete(req.params.id);
  if (!found) {
    return next(new ErrorHandler("product is not found in db", 404));
  }

  res.status(200).json({
    success: true,
    message: `product with id: ${req.params.id} deleted successfully`,
  });
});
