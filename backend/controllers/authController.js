const userSchema = require("../modals/user")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const bcrypt = require("bcryptjs")


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

    res.status(201).json({
        success: true,
        data: user1
    })
})

