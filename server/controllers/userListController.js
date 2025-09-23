import User from "../models/User.js";

// @desc Get 5 random users
// @route GET /api/users/random
// @access Public
export const getRandomUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      { $sample: { size: 5 } }, // get 5 random users
      { $project: { password: 0, googleId: 0 } } // exclude sensitive fields
    ]);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching random users:", error.message);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

// @desc Get all users
// @route GET /api/users/all
// @access Public
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -googleId");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};
