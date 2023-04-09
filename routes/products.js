const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

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
