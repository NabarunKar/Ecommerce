const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

// Import review routes
const reviewsRoutes = require("./reviews");

// Import category routes
const categoryRoutes = require("./category");

// Import tag routes
const tagsRoutes = require("./tags");

// Set up review routes
router.use("/reviews", reviewsRoutes);

// Set up category routes
router.use("/category", categoryRoutes);

// Set up tags routes
router.use("/tags", tagsRoutes);

// GET all products
router.get("/", productsController.getAllProducts);

// GET a single product
router.get(
  "/:id",
  productsController.getProductById,
  productsController.getProduct
);

// ADD a new product
router.post("/", productsController.addProduct);

// UPDATE a product
router.patch(
  "/:id",
  productsController.getProductById,
  productsController.updateProduct
);

// DELETE a product
router.delete(
  "/:id",
  productsController.getProductById,
  productsController.deleteProduct
);

module.exports = router;
