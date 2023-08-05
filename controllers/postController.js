// pc:begin: mongoose
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
try {
const { title, content } = req.body;
const post = new Post({ title, content });
const savedPost = await post.save();
res.status(201).json(savedPost);
} catch (error) {
res.status(500).json({ error: "Failed to create blog post" });
}
};

exports.getAllPosts = async (req, res) => {
try {
const posts = await Post.find().sort("-createdAt");
res.json(posts);
} catch (error) {
res.status(500).json({ error: "Failed to fetch blog posts" });
}
};

exports.getPostById = async (req, res) => {
try {
const post = await Post.findById(req.params.postId);
if (!post) {
return res.status(404).json({ error: "Blog post not found" });
}
res.json(post);
} catch (error) {
res.status(500).json({ error: "Failed to fetch blog post" });
}
};

exports.updatePost = async (req, res) => {
try {
const { title, content } = req.body;
const updatedPost = await Post.findByIdAndUpdate(
req.params.postId,
{ title, content },
{ new: true }
);
if (!updatedPost) {
return res.status(404).json({ error: "Blog post not found" });
}
res.json(updatedPost);
} catch (error) {
res.status(500).json({ error: "Failed to update blog post" });
}
};

exports.deletePost = async (req, res) => {
try {
const deletedPost = await Post.findByIdAndRemove(req.params.postId);
if (!deletedPost) {
return res.status(404).json({ error: "Blog post not found" });
}
res.json(deletedPost);
} catch (error) {
res.status(500).json({ error: "Failed to delete blog post" });
}
};

// pc:end: mongoose

// pc:begin: mongodb
const { client } = require("../db/connection");

exports.getAllPosts = async (req, res) => {
  try {
    const db = client.db("blogDB"); // Replace with your database name
    const posts = db.collection("posts");
    const data = await posts.find().sort({ createdAt: -1 }).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};

exports.getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const db = client.db("blogDB"); // Replace with your database name
    const posts = db.collection("posts");
    const data = await posts.findOne({ _id: postId });
    if (!data) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const db = client.db("blogDB"); // Replace with your database name
    const posts = db.collection("posts");
    const data = await posts.insertOne({ title, content });
    const postId = data.insertedId;
    res.status(201).json({ id: postId, title, content });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};

exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  try {
    const db = client.db("blogDB"); // Replace with your database name
    const posts = db.collection("posts");
    const data = await posts.findOneAndUpdate(
      { _id: postId },
      { $set: { title, content } }
    );
    if (!data.value) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ id: postId, title, content });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const db = client.db("blogDB"); // Replace with your database name
    const posts = db.collection("posts");
    const data = await posts.findOneAndDelete({ _id: postId });
    if (!data.value) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};

// pc:begin: mysql

const db = require("../db/connection");

const getAllPosts = async (req, res) => {
try {
const [rows] = await db.query(
"SELECT * FROM posts ORDER BY createdAt DESC"
);
res.json(rows);
} catch (error) {
console.error("Error fetching blog posts:", error);
res.status(500).json({ error: "Failed to fetch blog posts" });
}
};

const getPostById = async (req, res) => {
const { postId } = req.params;
try {
const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [postId]);
if (rows.length === 0) {
return res.status(404).json({ error: "Post not found" });
}
res.json(rows[0]);
} catch (error) {
console.error("Error fetching blog post:", error);
res.status(500).json({ error: "Failed to fetch blog post" });
}
};

const createPost = async (req, res) => {
const { title, content } = req.body;
try {
const [result] = await db.query(
"INSERT INTO posts (title, content) VALUES (?, ?)",
[title, content]
);
const postId = result.insertId;
res.status(201).json({ id: postId, title, content });
} catch (error) {
console.error("Error creating blog post:", error);
res.status(500).json({ error: "Failed to create blog post" });
}
};

const updatePost = async (req, res) => {
const { postId } = req.params;
const { title, content } = req.body;
try {
const [result] = await db.query(
"UPDATE posts SET title = ?, content = ? WHERE id = ?",
[title, content, postId]
);
if (result.affectedRows === 0) {
return res.status(404).json({ error: "Post not found" });
}
res.json({ id: postId, title, content });
} catch (error) {
console.error("Error updating blog post:", error);
res.status(500).json({ error: "Failed to update blog post" });
}
};

const deletePost = async (req, res) => {
const { postId } = req.params;
try {
const [result] = await db.query("DELETE FROM posts WHERE id = ?", [postId]);
if (result.affectedRows === 0) {
return res.status(404).json({ error: "Post not found" });
}
res.sendStatus(204);
} catch (error) {
console.error("Error deleting blog post:", error);
res.status(500).json({ error: "Failed to delete blog post" });
}
};
module.exports = {
getAllPosts,
getPostById,
createPost,
updatePost,
deletePost,
};


// pc:end: mysql
