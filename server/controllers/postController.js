import Post from "../models/Post.js";

// @desc Create a new post
// @route POST /api/posts
// @access Private
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newPost = await Post.create({
      title,
      content,
      author: req.user._id, // req.user is set by auth middleware
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all posts
// @route GET /api/posts
// @access Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email profilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
