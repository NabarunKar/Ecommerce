const express = require("express");
const tagsController = require("../controllers/tagsController");
const requireAuth = require("../middleware/requireAuth");
const requireUserRole = require("../middleware/requireUserRole");
const router = express.Router();

// ADD a new tag
router.post("/", requireAuth, requireUserRole, tagsController.createTag);

// GET all tags
router.get("/", tagsController.getAllTags);

// UPDATE a tag
router.patch(
  "/:id",
  requireAuth,
  requireUserRole,
  tagsController.updateTagById
);

// DELETE a tag
router.delete(
  "/:id",
  requireAuth,
  requireUserRole,
  tagsController.deleteTagById
);

// GET tag by id
router.get("/:id", tagsController.getTagById);

module.exports = router;
