const express = require("express");
const app = express();
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");
var cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
// require("dotenv").config({ path: "backend/config/conf.env" });

// setup for env
if (process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/conf.env" });
}

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(fileUpload());

// import all routes
const products = require("./routes/product");
const authroute = require("./routes/auth");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/payment");

// routing
app.use("/api/v1", products);
app.use("/api/v1", authroute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1", paymentRoute);

if (process.env.NODE_ENV == "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// error middleware is being used in last after routing, else not working.
app.use(errorMiddleware);

module.exports = app;
