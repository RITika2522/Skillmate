// controllers/googleController.js
import passport from "passport";
import jwt from "jsonwebtoken";

// Step 1: Start Google login
export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"], // request these fields from Google
});

// Step 2: Handle Google callback -> generate JWT
const handleGoogleCallback = (req, res) => {
  try {
    const user = req.user; // populated by passport (done callback in passport-setup.js)

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Store JWT in secure httpOnly cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend (you can change /home to /dashboard if needed)
    res.redirect(`${process.env.CLIENT_URL}/home`);
  } catch (err) {
    console.error("Error in Google callback:", err.message);
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
};

// Exported as array -> Express executes in order
export const googleCallback = [
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  handleGoogleCallback,
];
