const express = require("express");
const app = express();
const morgan = require("morgan");

// middleware
app.use(express.json());
app.use(morgan("dev"));

// import all routes
const products = require("./routes/product");

// routing
app.use("/api/v1", products);

module.exports = app;
