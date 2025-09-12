// controllers/userLogoutController.js
export const logoutUser = async (req, res) => {
  try {
    // Clear the cookie (set to empty with immediate expiration)
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only https in production
      sameSite: "strict",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error, unable to log out" });
  }
};
