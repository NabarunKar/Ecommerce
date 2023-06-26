const Product = require("../models/Product");
const User = require("../models/User");

async function addOrUpdateReview(req, res) {
  const productId = req.params.id;
  const { rating, text } = req.body;

  try {
    // Find the product by its ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the user's review already exists in the product's reviews array
    const existingReview = product.reviews.find(
      (review) => review.userId.toString() === req.authUserId.toString()
    );

    if (existingReview) {
      // Update the existing review
      existingReview.rating = rating;
      existingReview.text = text;
      existingReview.updatedAt = Date.now();
    } else {
      let user = await User.findById(req.authUserId);
      let userName = user.name;
      let userId = user._id;
      // Add a new review to the reviews array
      product.reviews.push({ userId, userName, rating, text });
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
    const product = await Product.findById(req.params.id);

    if (!product) {
      // Handle case where product is not found
      throw Error("Product not found.");
    }

    product.reviews = product.reviews.filter(
      (review) => review.userId.toString() !== req.authUserId.toString()
    );

    // Save the updated product
    await product.save();

    return res.json(product);
  } catch (err) {
    // Handle any errors that occur
    return {
      message: err.message,
    };
  }
};

module.exports = {
  addOrUpdateReview,
  deleteReviewByUserId,
};
