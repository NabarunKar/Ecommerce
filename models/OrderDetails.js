const mongoose = require("mongoose");

const orderDetailsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

// TODO: add pre middleware for save() method to reduce the product stock acc. to quantity
orderDetailsSchema.pre(
  "save",
  { document: true, query: false },
  async function (next) {
    try {
      await mongoose.model("Product").updateOne(
        { _id: this.productId },
        {
          $inc: { stock: -this.quantity },
        }
      );

      // Proceed to save the order detail
      next();
    } catch (err) {
      // If an error occurred, pass it to the next middleware
      next(err);
    }
  }
);

orderDetailsSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await mongoose.model("Product").updateOne(
        { _id: this.productId },
        {
          $inc: { stock: this.quantity },
        }
      );

      // Delete the orderDetails id from items array of Order schema
      await mongoose.model("Order").updateMany(
        { items: this._id },
        {
          $pull: {
            items: this._id,
            $inc: { totalPrice: -this.price * this.quantity },
          },
        }
      );

      next();
    } catch (err) {
      // If an error occurred, pass it to the next middleware
      next(err);
    }
  }
);

module.exports = mongoose.model("OrderDetails", orderDetailsSchema);
