import User from "../models/User.js";

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admin only." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default admin;
