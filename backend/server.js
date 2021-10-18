const app = require("./app");
require("dotenv").config({ path: "backend/config/conf.env" });
const connectDb = require("./config/db");
const cloudinary = require("cloudinary").v2;

// connecting to db
connectDb();

// cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//handling uncaught exceptions
// it is working but unnecessary
// process.on('uncaughtException', err => {
//   console.log(`Error: ${err.stack}`);
//   console.log('Shutting down due to uncaught exception');
//   process.exit(1)
// })

const server = app.listen(process.env.PORT, () =>
  console.log(`ecom app listening on port ${process.env.PORT} and mode is ${process.env.NODE_ENV}!`)
);

// handing unhandled promise rejection
// process.on("unhandledRejection", err => {
//   console.log(`ERROR: ${err.message}`)
//   console.log("shutting down server due to unhandled rejection")
//   server.close(() => {
//     process.exit(1)
//   })
// })
// above is not working
