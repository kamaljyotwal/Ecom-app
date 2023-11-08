const app = require("./app");
const connectDb = require("./config/db");
const cloudinary = require("cloudinary").v2;
// require("dotenv").config({ path: "backend/config/conf.env" });

// setup for env
if (process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/conf.env" });
}

// cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function serverStart(params) {
  await connectDb();
  const server = app.listen(process.env.PORT, () =>
    console.log(`Ecomm app listening on port ${process.env.PORT} and mode is ${process.env.NODE_ENV}!`)
  );
}
serverStart();
//Handling uncaught exceptions
// it is working but unnecessary
// process.on('uncaughtException', err => {
//   console.log(`Error: ${err.stack}`);
//   console.log('Shutting down due to uncaught exception');
//   process.exit(1)
// })

// Handing unhandled promise rejection
// process.on("unhandledRejection", err => {
//   console.log(`ERROR: ${err.message}`)
//   console.log("shutting down server due to unhandled rejection")
//   server.close(() => {
//     process.exit(1)
//   })
// })
