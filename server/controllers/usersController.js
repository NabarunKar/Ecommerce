const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Get all users
async function getAllUsers(req, res) {
  try {
    // ignore the password
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single user
async function getUser(req, res) {
  // Admin can also get any user
  const user = await User.findById(req.authUserId);
  if (user.super || req.authUserId === req.params.id) res.json(res.user);
  else
    res.status(400).json({ message: "Id doesn't match with the auth user id" });
}

// Update a user
async function updateUser(req, res) {
  try {
    if (req.authUserId === req.body._id) {
      const updatedUser = await User.updateOne(
        { _id: req.authUserId },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
          },
        }
      );

      res.json(updatedUser);
    } else
      res
        .status(400)
        .json({ message: "Id doesn't match with the auth user id" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete a user
async function deleteUser(req, res) {
  try {
    await res.user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Middleware function to get a user by ID
async function getUserById(req, res, next) {
  let user;
  try {
    // ignore the password
    user = await User.findById(req.authUserId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

// Login user
async function loginUser(req, res) {
  try {
    const user = await User.login({
      email: req.body.email,
      password: req.body.password,
    });

    // Create the token
    const token = createToken(user._id);

    res.status(200).json({ ...user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Signup user
async function signupUser(req, res) {
  try {
    const user = await User.signup(req.body);

    // Create the token
    const token = createToken(user._id);

    res.status(200).json({ ...user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
  signupUser,
};
