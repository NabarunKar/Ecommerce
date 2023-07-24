const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const ordersController = require("../controllers/ordersController");
const router = express.Router();

router.get("/", requireAuth, ordersController.getOrdersByUserId);

module.exports = router;
