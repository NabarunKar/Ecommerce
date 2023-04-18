const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
});

// add pre middleware to product schema
productSchema.pre("remove", async function (next) {
  try {
    // remove all reviews for this product
    await mongoose.model("Review").deleteMany({ productId: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Product", productSchema);
