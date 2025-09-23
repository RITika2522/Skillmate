import User from "../models/User.js";

// Get logged-in user's profile
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      skills,
      skillsToLearn,
      bio,
      company,
      qualification,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    user.name = name || user.name;
    user.email = email || user.email;
    user.skills = skills && skills.length > 0 ? skills : user.skills;
    user.skillsToLearn = skillsToLearn || user.skillsToLearn;
    user.bio = bio !== undefined ? bio : user.bio;
    user.company = company !== undefined ? company : user.company;
    user.qualification = qualification !== undefined ? qualification : user.qualification;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
