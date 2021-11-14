const orderModal = require("../modals/orderModal");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const ProductSchema = require("../modals/product");

// creation new order => api/v1/order/new-order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    shippingPrice,
    paymentInfo,
    itemsPrice,
    taxPrice,
    totalPrice,
    orderedItems,
  } = req.body;

  const order = await orderModal.create({
    shippingInfo,
    shippingPrice,
    paymentInfo,
    itemsPrice,
    taxPrice,
    totalPrice,
    orderedItems,
    user: req.user._id,
    paidAt: Date.now(),
  });
  res.status(201).json({ success: true, order: order });
});

// get single order => api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const singleOrder = await orderModal.findById(req.params.id).populate("user", "email");

  if (!singleOrder) {
    return res
      .status(404)
      .json({ success: false, message: `No order with id: ${req.params.id} found` });
  }

  res.status(200).json({ success: true, data: singleOrder });
});

// get all order of logged in user=> api/v1/order/me
exports.getAllOrdersByUser = catchAsyncErrors(async (req, res, next) => {
  const allOrders = await orderModal.find({ user: req.user.id });

  if (allOrders.length == 0) {
    return next(new ErrorHandler("You haven't placed any orders yet", 404));
  }
  res.status(200).json({ success: true, allOrders });
});

// ------------------------------------------------------------
// get all orders (admin)=> api/v1/order/admin/allorders
exports.adminAllOrders = catchAsyncErrors(async (req, res, next) => {
  const allOrders = await orderModal.find();
  const total = allOrders.length;
  let totalAmount = 0;

  allOrders.map((i) => {
    totalAmount += i.itemsPrice;
  });

  if (allOrders.length == 0) {
    return next(new ErrorHandler("No Orders", 404));
  }
  res.status(200).json({ success: true, total, totalAmount, allOrders });
});

// update/process order (admin) => api/v1/order/admin/updateOrder/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const foundProduct = await orderModal.findById(req.params.id);

  if (foundProduct.orderStatus == "delivered") {
    return next(new ErrorHandler("This product is already delivered", 400));
  }

  // updating the stock and inventory, invertory func. is defined below
  foundProduct.orderedItems.forEach(async (i) => {
    await inventoryFunc(i.quantity, i.productId);
  });

  foundProduct.orderStatus = req.body.orderStatus;
  foundProduct.deliveredAt = Date.now();
  await foundProduct.save();

  res.status(200).json({ success: true });
});
// inventory function
async function inventoryFunc(quantity, productId) {
  const product = await ProductSchema.findById(productId);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// deleting order => api/v1/order/delete/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const found = await orderModal.findByIdAndDelete(req.params.id);

  if (!found) {
    return next(new ErrorHandler("This order does not exist", 404));
  }
  res.status(200).json({
    success: true,
    message: `product with id: ${req.params.id} deleted successfully`,
  });
});
