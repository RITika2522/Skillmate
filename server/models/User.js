import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    googleId: { 
      type: String, 
      unique: true, 
      sparse: true 
    },

    // ✅ Current skills
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
    },

    // ✅ Skills user wants to learn
    skillsToLearn: {
      type: [String],
      default: [], // optional, starts empty
    },

    // Optional fields
    bio: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    qualification: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
