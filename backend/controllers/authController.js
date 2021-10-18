const userSchema = require("../modals/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bcrypt = require("bcryptjs");
const tokenFunc = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// register user => api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const user1 = await userSchema.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  // jwt setup in cookie and sending to client
  tokenFunc(user1, 201, res);
});

// login user => api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userSchema
    .findOne({
      email,
    })
    .select("+password");

  if (!user) {
    return next(new ErrorHandler("Email doesn't exist or password is incorrect", 400));
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

// reset password =>api/v1/password/reset/:id
exports.resetPass = catchAsyncErrors(async (req, res, next) => {
  const hashed = crypto.createHash("sha256").update(req.params.hashedTkn).digest("hex");

  const user = await userSchema.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorHandler("Either token is invalid or has expired", 403));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("new password mismatch", 400));
  }

  // new password setup
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    msg: "password updated",
  });
});

// current user => api/v1/me
exports.getCurrentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userSchema.findById(req.user._id);
  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    });
  }
});

// updating password => api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await userSchema.findById(req.user._id).select("+password");
  const ismatching = bcrypt.compareSync(oldPassword, user.password);

  if (!ismatching) {
    return next(new ErrorHandler("You entered wrong current password", 406));
  } else if (ismatching) {
    if (newPassword !== confirmPassword) {
      return next(new ErrorHandler("Type the new password correctly", 400));
    }
    if (newPassword === oldPassword) {
      return next(
        new ErrorHandler("Try something diffrent, this is already your current password", 400)
      );
    }

    // setting and saving new password
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully, login again",
    });
  }
});

// update user details => api/v1/updateProfile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newData = await userSchema.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  // updating avatar/picture to be done
  res.status(201).json({ success: true, data: newData });
});

// ADMIN ROUTES-----------------------------------------------------------
// get all users => api/v1/admin/allUsers
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const user = await userSchema.find();
  res.status(200).json({ success: true, data: user });
});

// get one use => api/v1/admin/user/:id
exports.getuserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await userSchema.findById(req.params.id);
  if (user == null) {
    return next(new ErrorHandler("user does not exist"), 404);
  }
  res.status(200).json({ success: true, data: user });
});

// update user => api/v1/admin/user/:id
exports.updateProfileByAdmin = catchAsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await userSchema.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  if (user === null) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({ success: true, message: "Update successfully" });
});

// delete product => api/v1/admin/products/:id
exports.deleteUserByAdmin = catchAsyncErrors(async (req, res, next) => {
  const found = await userSchema.findByIdAndDelete(req.params.id);
  if (!found) {
    return next(new ErrorHandler("user doesn't exist", 404));
  }

  res.status(200).json({
    success: true,
    message: `user with id: ${req.params.id} deleted successfully`,
  });
});
