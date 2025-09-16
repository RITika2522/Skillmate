// routes/userRoute.js
import express from "express";
import { registerUser } from "../controllers/userRegistrationController.js";
import { loginUser } from "../controllers/userLoginController.js";
import { logoutUser } from "../controllers/userLogoutController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { googleLogin, googleCallback } from "../controllers/googleController.js";

const router = express.Router();

// 🔹 Normal auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// 🔹 Google OAuth routes (delegated to controller)
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

// 🔹 Protected route example
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

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
