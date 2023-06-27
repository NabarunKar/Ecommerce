const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const productsController = require("../controllers/productsController");

router.post("/", requireAuth, productsController.addToWishlist);

router.delete(
  "/:id",
  requireAuth,
  productsController.getProductById,
  productsController.deleteFromWishlist
);

module.exports = router;
