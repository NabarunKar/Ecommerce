const express = require("express");
const categoryController = require("../controllers/categoryController");
const requireAuth = require("../middleware/requireAuth");
const requireUserRole = require("../middleware/requireUserRole");
const router = express.Router();

// ADD a new category
router.post(
  "/",
  requireAuth,
  requireUserRole,
  categoryController.createCategory
);

// GET all category
router.get("/", categoryController.getAllCategories);

// UPDATE a category
router.patch(
  "/:id",
  requireAuth,
  requireUserRole,
  categoryController.updateCategoryById
);

// DELETE a category
router.delete(
  "/:id",
  requireAuth,
  requireUserRole,
  categoryController.deleteCategoryById
);

// GET category by id
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
