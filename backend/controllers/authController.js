const userSchema = require("../modals/user")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const bcrypt = require("bcryptjs")
const tokenFunc = require("../utils/jwtToken")


// register user => api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body
    const user1 = await userSchema.create({
        name,
        email,
        password,
        avatar: {
            public_id: "products/61oXGZ60GfL_fixco9",
            url: "https://res.cloudinary.com/bookit/image/upload/v1614877995/products/61oXGZ60GfL_fixco9.jpg"
        }
    })
    // jwt setup in cookie and sending response
    tokenFunc(user1, 200, res)
})

// login user => api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    const user = await userSchema.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("User with this email does not exist", 400))
    }
    else if (bcrypt.compareSync(password, user.password) == false) {
        return next(new ErrorHandler("password is incorrect", 400))
    } else {
        tokenFunc(user, 200, res)
        // const tkn = user.getJWToken();
        // res.status(200).json({ success: true, token: tkn })
    }
})

// logout user => api/v1/logout
exports.logoutUser = (req, res, next) => {
    res.cookie("tkn", null, { expires: new Date(Date.now()), httpOnly: true }).send('logged out')
}