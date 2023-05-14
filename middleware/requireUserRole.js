const User = require("../models/User");

const requireUserRole = async (req, res, next) => {
  const user = User.findOne({ _id: req.authUserId });
  // If the user is super (i.e. Admin) then allow
  if (user.super) {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = requireUserRole;
