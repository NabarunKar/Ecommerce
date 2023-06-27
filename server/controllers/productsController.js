const Product = require("../models/Product");
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
  try {
    // Access the product obtained from the middleware
    const product = res.product;

    // Update the product with the request body data
    Object.assign(product, req.body);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete a product
async function deleteProduct(req, res) {
  try {
    await res.product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add product to wishlist
async function addToWishlist(req, res) {
  const { productId } = req.body;
  const user = await User.findById(req.authUserId);
  const product = await Product.findById(productId);
  try {
    if (user) {
      if (product) {
        let existingProductId = user.wishlist.find(
          (ele) => ele.productId.toString() === product._id.toString()
        );
        if (!existingProductId) {
          user.wishlist.push({ productId: product._id });
        }
        await user.save();
        res.json(user.wishlist);
      } else {
        throw Error("Product not found");
      }
    } else {
      throw Error("Invalid user token");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deleteFromWishlist(req, res) {
  const user = await User.findById(req.authUserId);
  try {
    if (user) {
      user.wishlist = user.wishlist.filter(
        (ele) => ele.productId.toString() === res.product._id.toString()
      );
      await user.save();
      res.json(user.wishlist);
    } else {
      throw Error("Invalid token");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  addToWishlist,
  deleteFromWishlist,
};
