const User = require("../models/User");

const requireUserRole = async (req, res, next) => {
  const user = await User.findOne({ _id: req.authUserId });
  // If the user is super (i.e. Admin) then allow
  if (user.super) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Only admins can access this data" });
  }
};

module.exports = requireUserRole;
