const app = require("./app");
require("dotenv").config({ path: "backend/config/config.env" });
const connectDb = require("./config/db");

// connecting to db
connectDb();

app.listen(process.env.PORT, () =>
  console.log(`ecom app listening on port ${process.env.PORT} and mode is ${process.env.NODE_ENV}!`)
);
