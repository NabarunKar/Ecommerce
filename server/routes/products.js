const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const requireUserRole = require("../middleware/requireUserRole");

// Add wishlist routes
const wishlistRoutes = require("./wishlists");
router.use("/wishlists", wishlistRoutes);

// GET all products
router.get("/", productsController.getAllProducts);

// GET a single product
router.get(
  "/:id",
  productsController.getProductById,
  productsController.getProduct
);

// ADD a new product
router.post("/", requireAuth, requireUserRole, productsController.addProduct);

// UPDATE a product
router.patch(
  "/:id",
  requireAuth,
  requireUserRole,
  productsController.getProductById,
  productsController.updateProduct
);

// DELETE a product
router.delete(
  "/:id",
  requireAuth,
  requireUserRole,
  productsController.getProductById,
  productsController.deleteProduct
);

module.exports = router;
