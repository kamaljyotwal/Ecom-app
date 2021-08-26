const app = require("./app");
require("dotenv").config({ path: "backend/config/config.env" });
const connectDb = require("./config/db");

// connecting to db
connectDb();

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

