const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name for product"],
      trim: true,
      maxLength: [100, "product name should be within 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "please provide a product name"],
      trim: true,
      maxLength: [7, "You can only sell product within 7 figure price"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "please provide description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please select a category for the product"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Clothes/Shoes",
          "Beauty/Health",
          "Sports",
          "Outdoor",
          "Home",
        ],
        message: "Please select correct category for product",
      },
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [5, "Product name cannot exceed 5 characters"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    // poster: {
    //   type: mongoose.Schema.ObjectId,
    //   required: [true, "provide the poster"],
    //   ref: "users",
    // },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  }
  // { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
