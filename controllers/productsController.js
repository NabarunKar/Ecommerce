const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single product
async function getProduct(req, res) {
  res.json(res.product);
}

// Add a new product
async function addProduct(req, res) {
  const product = new Product(req.body);

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Update a product
async function updateProduct(req, res) {
  for (const prop in req.body) {
    if (req.body[prop]) {
      res.product[prop] = req.body[prop];
    }
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete a product
async function deleteProduct(req, res) {
  try {
    res.product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add review to product (takes a review object as request)
async function addReview(req, res) {
  const review = new Review(req.body);
  try {
    let product = await Product.findById(review.productId);
    if (!product) {
      return res.status(404).json({ message: "Cannot find product" });
    }
    let user = await User.findById(review.userId);
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    if (user.name) review.userName = user.name;
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get reviews of a particular product
async function getReviews(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviews = await Review.find({ productId: req.params.id });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// Update a particular review
async function updateReview(req, res) {
  try {
    const updatedReview = await Review.updateOne(
      { _id: req.body._id },
      {
        $set: {
          rating: req.body.rating,
          content: req.body.content,
        },
      }
    );

    res.status(200).json(updatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

// Delete a particular review
async function deleteReview(req, res) {
  try {
    const deletedReview = await Review.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get review by review id
async function getReviewById(req, res) {
  let review;
  try {
    review = await Review.findById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ message: `Cannot find review with id ${req.params.id}` });
    }
    res.json(review);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Middleware function to get a product by ID
async function getProductById(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Cannot find product" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  addReview,
  getReviews,
  updateReview,
  deleteReview,
  getReviewById,
};
