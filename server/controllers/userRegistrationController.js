import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, skills, bio, company, qualification } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password || !skills || skills.length === 0) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      skills,
      bio,
      company,
      qualification,
    });

    await newUser.save();

    // 5. Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        skills: newUser.skills,
        bio: newUser.bio,
        company: newUser.company,
        qualification: newUser.qualification,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
