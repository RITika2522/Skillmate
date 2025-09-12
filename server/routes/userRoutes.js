import express from "express";
import { registerUser } from "../controllers/userRegistrationController.js";
import { loginUser } from "../controllers/userLoginController.js";
import { logoutUser } from "../controllers/userLogoutController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser); // ✅ added

router.get("/profile", protect, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

export default router;
