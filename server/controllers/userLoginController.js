// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter both email and password" });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // store this in .env
      { expiresIn: "7d" } // token valid for 7 days
    );

    // 5. Set cookie (httpOnly for security)
    res.cookie("accessToken", token, {
      httpOnly: true, // prevents client-side JS access
      secure: process.env.NODE_ENV === "production", // only https in production
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6. Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills,
        bio: user.bio,
        company: user.company,
        qualification: user.qualification,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

