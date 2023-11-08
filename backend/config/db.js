const mongoose = require("mongoose");

async function connectDb() {
  try {
    const res = await mongoose.connect(`${process.env.MONGO_ATLAS_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(`mongodb connect on ${res.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDb;