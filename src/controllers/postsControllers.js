const db = require("../db");

// Endpoint to create a post
exports.createPost = async (req, res) => {
  const { user_id, content, image, video } = req.body;
  const date = new Date();
  try {
    const [rows, fields] = await db.query(
      `INSERT INTO POST (user_id, content, image, video, created_at, updated_at) VALUES (?,?,?,?,?,?)`,
      [user_id, content, image, video, date, date]
    );
    res.status(200).json({ message: "post created successfully" });
  } catch (err) {
    console.log("Failed to create post", err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

//Endpoint to update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const date = new Date();
  const { user_id, content, image, video } = req.body;
  try {
    const [rows, fields] = await db.query(
      `UPDATE posts SET content=? , image=? , video=? , updated_at = ? WHERE post_id = ?`,
      [content, image, video, date, id]
    );
    res.status(200).json({ message: "post updated successfully" });
  } catch (err) {
    console.log("Failed to update post", err);
    res.status(500).json({ error: "Failed to update post" });
  }
};

//Endpoint to delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows, fields] = db.query(`DELETE FROM POST WHERE POST_ID = ?`, [id]);
    res.status(200).json({ message: "post updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
    console.log("Failed to delete post", err);
  }
};

//Endpoint to get all posts of a user
exports.getPostsbyUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows, fields] = db.query(`SELECT * FROM POSTS WHERE USER_ID = ?`, [
      id,
    ]);
    res.status(200).json({ results: rows });
  } catch (err) {
    res.status(500).json({ message: "Failed to get posts" });
    console.log("Failed to get posts", err);
  }
};
