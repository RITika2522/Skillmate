// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // parse JSON request body
app.use(cors(
  {origin: 'http://localhost:5173', credentials: true}

)); // enable CORS for frontend requests

app.use(cookieParser());

// Routes (will import later)
import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

  