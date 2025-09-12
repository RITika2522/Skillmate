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
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    skills: {
      type: [String], // array of skills
      required: [true, "At least one skill is required"],
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
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const User = mongoose.model("User", userSchema);
export default User;
