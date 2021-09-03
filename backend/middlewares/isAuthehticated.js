// check whether user is authenticated
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')
const userSchema = require("../modals/user")

exports.isUserAuthenticated = catchAsyncErrors(async (req, res, next) => {

    const { tkn } = req.cookies
    if (!tkn) {
        return next(new ErrorHandler("No token found, login first", 401))
    }

    const decoded = jwt.verify(tkn, process.env.JWT_SECRET)
    req.user = await userSchema.findById(decoded.id)

    if (!req.user) {
        res.status(401).send("Token problem")
    } else {
        next()
    }
})