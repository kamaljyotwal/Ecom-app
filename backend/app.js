const express = require("express");
const app = express();
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");

// middlewares
app.use(express.json());
app.use(morgan("dev"));


// import all routes
const products = require("./routes/product");
const authroute = require("./routes/auth")

// routing
app.use("/api/v1", products);
app.use("/api/v1", authroute)

// error middleware is being used in last after routing, else not working.
app.use(errorMiddleware);

module.exports = app;
