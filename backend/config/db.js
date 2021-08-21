const mongoose = require("mongoose");

// currently connecting to local mongoDB
function connectDb() {
  mongoose
    .connect(process.env.LOCAL_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((res) => console.log(`mongodb connect on ${res.connection.host}`))
    .catch((err) => console.log(err));
}

module.exports = connectDb;
