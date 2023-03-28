const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

  // password needs atleast one uppercase, lowercase, special char & number
  if (!validator.isStrongPassword(user.password)) {
    throw Error("Strong password is required");
  }

  const exists = await this.findOne({ email: user.email });
  if (exists) {
    throw Error("Email already in use");
  }
  // Generate salt
  const salt = await bcrypt.genSalt(10);
  // Generate hash
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
  const newUser = await this.create(user);
  return newUser;
};

module.exports = mongoose.model("User", userSchema);
