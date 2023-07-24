const Order = require("../models/Order");

// Get all orders for a user
async function getOrdersByUserId(req, res) {
  try {
    const orders = await Order.find({ userId: req.authUserId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getOrdersByUserId,
};
