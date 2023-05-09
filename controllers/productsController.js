const Product = require("../models/Product");

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
    await res.product.deleteOne();
    res.json({ message: "Product deleted" });
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
};
