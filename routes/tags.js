const express = require("express");
const tagsController = require("../controllers/tagsController");
const router = express.Router();

// ADD a new category
router.post("/", tagsController.createTag);

// GET all category
router.get("/", tagsController.getAllTags);

// UPDATE a category
router.patch("/:id", tagsController.updateTagById);

// DELETE a category
router.delete("/:id", tagsController.deleteTagById);

// GET category by id
router.get("/:id", tagsController.getTagById);

module.exports = router;
