const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  images: [{ type: String, required: true }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

// add pre middleware to product schema
productSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      // remove all reviews for this product
      await mongoose.model("Review").deleteMany({ productId: this._id });
      next();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = mongoose.model("Product", productSchema);
