const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const router = express.Router();

// ADD a new review
router.post("/", reviewsController.addReview);

// GET all reviews for a product
router.get("/:id", reviewsController.getReviews);

// UPDATE a review
router.patch("/", reviewsController.updateReview);

// DELETE a review
router.delete("/:id", reviewsController.deleteReview);

// GET review by id
router.get("/review/:id", reviewsController.getReviewById);

module.exports = router;
