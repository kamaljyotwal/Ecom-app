const productSchema = require("../modals/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// create new product => api/v1/admin/products/new
exports.newProducts = catchAsyncErrors(async (req, res, next) => {
  // req object also send user prop which contains data of signed in user so we are accesing that and assigning its _id property to poster so we don't need to provide it via postman/frontend
  req.body.poster = req.user._id;
  const prod = await productSchema.create(req.body);
  res.status(201).json({
    success: true,
    data: prod,
  });
});

// get all products in db =>api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const api3 = new APIFeatures(productSchema.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  // const alldata = await productSchema.find();
  const alldata = await api3.query;
  const allProductsCount = await productSchema.count();

  if (alldata.length === 0) {
    return next(new ErrorHandler("internal server error", 500));
  }

  res.status(200).json({
    sucess: true,
    resPerPage,
    allProductsCount,
    data: alldata,
  });
});

// find & get one product => api/v1/product/:id
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
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const found = await productSchema.findByIdAndDelete(req.params.id);
  if (!found) {
    return next(new ErrorHandler("product is not found in db", 404));
  }

  res.status(200).json({
    success: true,
    message: `product with id: ${req.params.id} deleted successfully`,
  });
});

// create new review => api/v1/addReview/
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { comment, rating, productId } = req.body;
  const product = await productSchema.findById(productId);

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: rating,
    comment: comment,
  };
  const isReviewed = product.reviews.find((i) => i.user.toString() === req.user._id.toString());

  if (isReviewed) {
    product.reviews.forEach((i) => {
      if (i.user.toString() === req.user._id.toString()) {
        i.rating = rating;
        i.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings = product.reviews.reduce((acc, i) => acc + i.rating, 0) / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

// get all review => api/v1/reviews?id=query
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.query.id);

  if (!product) {
    return res.status(404).json({ success: false, message: "this products doesn't exist" });
  }
  if (product.reviews.length == 0) {
    return res.status(404).json({ success: false, message: "No reviews on this product." });
  }
  res.status(200).json({ success: true, reviews: product.reviews });
});

// delete review => api/v1/review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await productSchema.findById(req.query.productId);
  const reviews2 = product.reviews.filter(
    (i) => i._id.toString() !== req.query.reviewId.toString()
  );

  if (reviews2.length === 0) {
    await productSchema.findByIdAndUpdate(
      req.query.productId,
      {
        numOfReviews: 0,
        reviews: reviews2,
        ratings: 0,
      },
      {
        new: true,
        useFindAndModify: false,
        runValidators: true,
      }
    );
    return res.status(200).json({ success: true });
  }

  const ratings = reviews2.reduce((acc, i) => acc + i.rating, 0) / reviews2.length;
  const numOfReviews = reviews2.length;
  product.reviews = product.reviews;

  await productSchema.findByIdAndUpdate(
    req.query.productId,
    {
      reviews: reviews2,
      numOfReviews: numOfReviews,
      ratings,
    },
    {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    }
  );
  res.status(200).json({ success: true });
});
