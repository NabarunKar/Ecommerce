const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  super: {
    type: Boolean,
    default: false,
  },
});

// Static signup method
userSchema.statics.signup = async function (user) {
  // validation
  if (!user.email || !user.password) {
    throw Error("Incomplete fields");
  }

  // email pattern validation
  if (!validator.isEmail(user.email)) {
    throw Error("Invalid email format");
  }

  // check if email already exists or not
  const exists = await this.findOne({ email: user.email });
  if (exists) {
    throw Error("Email already in use");
  }

  // password needs atleast one uppercase, lowercase, special char & number
  if (!validator.isStrongPassword(user.password)) {
    throw Error("Strong password is required");
  }

  // Generate salt
  const salt = await bcrypt.genSalt(10);
  // Generate hash
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  user.super = false;
  const newUser = await this.create(user);
  return newUser;
};

// Static login method
userSchema.statics.login = async function (obj) {
  if (!obj.email || !obj.password) {
    throw Error("Incomplete fields");
  }
  const user = await this.findOne({ email: obj.email });
  // if (!user) {
  //   throw Error("Incorrect email");
  // }

  // Validate password
  const match = await bcrypt.compare(obj.password, user.password);
  if (!user || !match) {
    throw Error("Invalid credentials");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
