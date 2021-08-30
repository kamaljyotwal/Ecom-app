// const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV == "PRODUCTION") {
    // when wrong _id is provided as a param
    if (err.name == "CastError") {
      const messagec = `Resource not found. Invalid id ${err.value}`

      return res.status(err.statusCode).json({
        success: false,
        message: messagec
      });

    }

    // handling mongoose validation error
    if (err.errors.name.name == "ValidatorError") {
      const msg = Object.values(err.errors).map(i => i.message)

      return res.status(400).json({
        success: false,
        error: msg
      })
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message || "internal server error",
      // err: err
    });
  }
};
