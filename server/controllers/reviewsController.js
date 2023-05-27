const Product = require("../models/Product");

async function addOrUpdateReview(req, res) {
  const productId = req.params.productId;
  const { userId, rating, text } = req.body;

  try {
    // Find the product by its ID
    const product = await Product.findById(productId);

    if (userId !== req.authUserId) {
      return res.status(401).json({ error: "UserId and token doesn't match" });
    }

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the user's review already exists in the product's reviews array
    const existingReview = product.reviews.find(
      (review) => review.userId === userId
    );

    if (existingReview) {
      // Update the existing review
      existingReview.rating = rating;
      existingReview.text = text;
    } else {
      // Add a new review to the reviews array
      product.reviews.push({ userId, rating, text });
    }

    // Save the updated product
    const updatedProduct = await product.save();

    return res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteReviewByUserId = async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.productId);

    if (!product) {
      // Handle case where product is not found
      return { success: false, message: "Product not found." };
    }

    // Find the index of the review with the given userId
    const reviewIndex = product.reviews.findIndex(
      (review) => review.userId === req.authUserId
    );

    if (reviewIndex === -1) {
      // Handle case where review with userId is not found
      return { success: false, message: "Review not found with given userId" };
    }

    // Remove the review from the array
    product.reviews.splice(reviewIndex, 1);

    // Save the updated product
    await product.save();

    return { success: true, message: "Review deleted successfully." };
  } catch (err) {
    // Handle any errors that occur
    return {
      success: false,
      message: err.message,
    };
  }
};

module.exports = {
  addOrUpdateReview,
  deleteReviewByUserId,
};
