import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/createPost", protect, createPost); // only logged in users can create posts
router.get("/readPost", getPosts); // public - view all posts

export default router;
