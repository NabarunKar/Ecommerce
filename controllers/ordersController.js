const User = require("../models/User");
const Product = require("../models/Product");
const OrderDetails = require("../models/OrderDetails");
const Order = require("../models/Order");

// Place order for array of products at once
async function placeOrders(req, res) {
  // GET the user from database
  const user = await User.findOne({ _id: req.authUserId });
  if (!user) {
    return res.status(403).json({ message: "Forbidden" });
  }
  // The request should contain an array object `orders`
  // Which contains the Product ids and quantities
  // [ {productId: 101, quantity: 5}, ...]
  try {
    const orders = req.orders.map((order) => {
      return {
        ...order,
        price: Product.findById(order.productId).price, // Write the discounted price logic here if needed
      };
    });
    const docs = await OrderDetails.insertMany(orders);
    const insertedOrderDetailsIds = docs.map((order) => order._id);
    const order = new Order({
      userId: user._id,
      items: insertedOrderDetailsIds,
      totalPrice: docs.reduce((total, ele) => total + ele.price, 0),
      deliveryAddress: req.deliveryAddress
        ? req.deliveryAddress
        : user.deliveryAddress,
    });
    const insertedOrder = await order.save();
    res.status(201).json(insertedOrder);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

// Cancel purchase orders from an array of ids
async function cancelOrders(req, res) {
  // GET the user from database
  const user = await User.findOne({ _id: req.authUserId });
  if (!user) {
    return res.status(403).json({ message: "Forbidden" });
  }
  // The request should contain an array object `ids`
  const ids = req.ids;
  try {
    let orderDetailsObj;
    let count = 0;
    for (let id of ids) {
      orderDetailsObj = await OrderDetails.findById(id);
      if (orderDetailsObj && orderDetailsObj.userId === user._id) {
        await orderDetailsObj.deleteOne();
        count++;
      }
    }

    res.status(200).json({ message: `${count} documents deleted` });
    console.log(`${count} documents deleted`);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

module.exports = {
  placeOrders,
  cancelOrders,
};
