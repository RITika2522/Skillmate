// controllers/userLogoutController.js
export const logoutUser = async (req, res) => {
  try {

    res.clearCookie("accessToken", {
      httpOnly: true, // prevents client-side JS access
      secure: process.env.NODE_ENV === "production", // only https in production
      sameSite: "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
   
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error, unable to log out" });
  }
};
