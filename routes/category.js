const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

// ADD a new category
router.post("/", categoryController.createCategory);

// GET all category 
router.get("/", categoryController.getAllCategories);

// UPDATE a category
router.patch("/:id", categoryController.updateCategoryById);

// DELETE a category
router.delete("/:id", categoryController.deleteCategoryById);

// GET category by id
router.get("/:id", categoryController.getCategoryById);

module.exports = router;