// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import routes & passport config
import userRoutes from "./routes/userRoutes.js";
import("./config/passport-setup.js"); // Google OAuth strategy

const app = express();

// -------------------- Middleware --------------------
app.use(express.json());
app.use(cookieParser());

// ✅ Enable CORS for frontend (React)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // allow cookies
  })
);

// Initialize Passport
app.use(passport.initialize());

// -------------------- Routes --------------------
app.use("/api/users", userRoutes);

// -------------------- MongoDB Connection --------------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
