const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single user
async function getUser(req, res) {
  res.json(res.user);
}

// Create a new user
// async function createUser(req, res) {
//   const user = new User(req.body);

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// }

// Update a user
async function updateUser(req, res) {
  for (const prop in req.body) {
    if (req.body[prop]) {
      res.user[prop] = req.body[prop];
    }
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
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
    user = await User.findById(req.params.id);
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

    const email = user.email;

    res.status(200).json({ email, token });
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

    const email = user.email;

    res.status(200).json({ email, token });
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
