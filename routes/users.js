const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const requireAuth = require("../middleware/requireAuth");

// GET all users
router.get("/", usersController.getAllUsers);

// GET a single user
router.get(
  "/:id",
  requireAuth,
  usersController.getUserById,
  usersController.getUser
);

// CREATE a new user
// router.post("/", usersController.createUser);

// UPDATE a user
router.patch("/:id", usersController.getUserById, usersController.updateUser);

// DELETE a user
router.delete("/:id", usersController.getUserById, usersController.deleteUser);

// Login user
router.post("/login", usersController.loginUser);

// Signup user
router.post("/signup", usersController.signupUser);

module.exports = router;
