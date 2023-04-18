const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

// ADD a new review
router.post("/", productsController.addReview);

// GET all reviews for a product
router.get("/:id", productsController.getReviews);

module.exports = router;
