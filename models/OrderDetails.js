const mongoose = require("mongoose");

const orderDetailsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
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

module.exports = mongoose.model("OrderDetails", orderDetailsSchema);
