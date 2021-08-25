const express = require("express");
const app = express();
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");

// middleware
app.use(express.json());
app.use(morgan("dev"));

// import all routes
const products = require("./routes/product");

// routing
app.use("/api/v1", products);

app.use(errorMiddleware);
module.exports = app;
