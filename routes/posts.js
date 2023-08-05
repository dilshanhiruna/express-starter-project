const express = require("express");
const router = express.Router();

// pc:begin: mongoose
const postController = require("../controllers/postController");
// pc:end: mongoose

// pc:begin: mysql
const postController = require("../controllers/postController");
// pc:end: mysql

// pc:begin: mongodb
const postController = require("../controllers/postController");
// pc:end: mongodb

// Get all blog posts
router.get("/", postController.getAllPosts);

// Get blog post by ID
router.get("/:postId", postController.getPostById);

// Create a new blog post
router.post("/", postController.createPost);

// Update a blog post by ID
router.put("/:postId", postController.updatePost);

// Delete a blog post by ID
router.delete("/:postId", postController.deletePost);

module.exports = router;
