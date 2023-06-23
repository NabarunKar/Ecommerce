const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Auth token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    let user = await User.findOne({ _id });
    if (user) req.authUserId = user._id;
    else throw Error("User doesn't exist");
    next();
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

module.exports = requireAuth;
