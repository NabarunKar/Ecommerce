const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const reviewsController = require("../controllers/reviewsController");
const router = express.Router();

// Add or update review
router.post("/:id", requireAuth, reviewsController.addOrUpdateReview);

// Delete a review by userId
router.delete("/:id", requireAuth, reviewsController.deleteReviewByUserId);

module.exports = router;
