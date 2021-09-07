const setupTokenInCookie = (user, statusCode, res) => {
  // creating token
  const tkn2 = user.getJWToken();

  // cookie options
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPTIME * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("tkn", tkn2, options).json({
    success: true,
    data: user,
  });
};
module.exports = setupTokenInCookie;
