// In this file, we are seeding mongo with the data available in local json file.
require("dotenv").config({ path: "backend/config/conf.env" });
const productData = require("../data/productData.json");
const connectDb = require("../config/db");
const productSchema = require("../modals/product");

connectDb();

const seederFunc = async () => {
  try {
    await productSchema.deleteMany();
    console.log("deleted");
    await productSchema.insertMany(productData);
    console.log("added");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seederFunc();
