const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
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

      // remove all orderDetails for this product
      const orderDetailsArray = await mongoose
        .model("OrderDetails")
        .find({ productId: this._id })
        .exec();
      for (const o of orderDetailsArray) {
        await o.deleteOne();
      }

      next();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = mongoose.model("Product", productSchema);
