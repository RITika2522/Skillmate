// routes/userRoute.js
import express from "express";
import { registerUser } from "../controllers/userRegistrationController.js";
import { loginUser } from "../controllers/userLoginController.js";
import { logoutUser } from "../controllers/userLogoutController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { googleLogin, googleCallback } from "../controllers/googleController.js";
import { getRandomUsers, getAllUsers } from "../controllers/userListController.js";
import { updateUserProfile, getCurrentUser } from "../controllers/userUpdateController.js";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Normal auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// 🔹 Google OAuth routes (delegated to controller)
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

router.get("/random", getRandomUsers);
router.get("/all", getAllUsers);

// Get current user profile
router.get("/me", protect, getCurrentUser);

// Update user profile
router.put("/update", protect, updateUserProfile);

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
