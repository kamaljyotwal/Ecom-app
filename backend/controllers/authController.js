const userSchema = require("../modals/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bcrypt = require("bcryptjs");
const tokenFunc = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// register user => api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body;

  const user1 = await userSchema.create({
    name,
    email,
    password,
    avatar: {
      public_id: "products/61oXGZ60GfL_fixco9",
      url: "https://res.cloudinary.com/bookit/image/upload/v1614877995/products/61oXGZ60GfL_fixco9.jpg",
    },
  });
  // jwt setup in cookie and sending response
  tokenFunc(user1, 201, res);
});

// login user => api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  const user = await userSchema
    .findOne({
      email,
    })
    .select("+password");

  if (!user) {
    return next(new ErrorHandler("User with this email does not exist", 400));
  } else if (bcrypt.compareSync(password, user.password) == false) {
    return next(new ErrorHandler("password is incorrect", 400));
  } else {
    tokenFunc(user, 200, res);
    // const tkn = user.getJWToken();
    // res.status(200).json({ success: true, token: tkn })
  }
});

// logout user => api/v1/logout
exports.logoutUser = (req, res, next) => {
  res
    .cookie("tkn", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .send("logged out");
};

// forgot password =>api/v1/password/forgot
exports.forgotPass = catchAsyncErrors(async (req, res, next) => {
  const user1 = await userSchema.find({
    email: req.body.email,
  });
  if (user1.length == 0) {
    return next(new ErrorHandler("No user with this Email", 404));
  }

  const tkn = user1[0].getResetPasswordtkn();
  await user1[0].save({
    validateBeforeSave: false,
  });
  const address = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${tkn}`;

  const message = `Click the link below to reset your password:\n\n <a>${address}</a>`;
  const subject = `Password Reset link`;

  try {
    const options = {
      email: user1[0].email,
      text: message,
      subject: subject,
    };

    await sendEmail(options);
    res.status(200).json({
      success: true,
      msg: `Email sent to ${user1[0].email}`,
    });
  } catch (error) {
    user1[0].resetPasswordExpire = undefined;
    user1[0].resetPasswordToken = undefined;

    await user1[0].save();
    next(new ErrorHandler("Some error occured", 500));
  }
});