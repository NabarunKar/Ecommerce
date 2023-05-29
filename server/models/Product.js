const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
    categories: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        text: {
          type: String,
        },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
