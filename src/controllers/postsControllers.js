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
  console.log("Trying to access getPostsbyUserId controller");
  try {
    const [rows, fields] = await db.query(
      `SELECT p.*, COUNT(l.like_id) AS likes_count
      FROM Posts p
      LEFT JOIN Likes l ON p.post_id = l.post_id
      WHERE p.user_id = ?
      GROUP BY p.post_id`,
      [id]
    );

    // Assuming `rows` is the array of results
    res.status(200).json({ results: rows });
  } catch (err) {
    res.status(500).json({ message: "Failed to get posts" });
    console.log("Failed to get posts", err);
  }
};

// Endpoint to get top "N" recently created posts by a user's friends
exports.getRecentPostsByFriends = async (req, res) => {
  // Extract parameters from request
  const userId = req.params.id;
  const limit = req.query.limit || 10; // Default limit is 10
  const pageNumber = req.query.pageNumber || 0;
  const offset = pageNumber * limit; // Default offset is 0

  try {
    // Query to retrieve top "N" recently created posts by a user's friends
    const query = `
    SELECT p.*, u.full_name AS author_name, u.profile_picture AS author_profile_picture
    FROM posts p
    INNER JOIN friends f ON (p.user_id = f.user2_id)
    INNER JOIN users u ON (p.user_id = u.user_id)
    WHERE f.user1_id = ?
    ORDER BY p.created_at DESC
    LIMIT ?
    OFFSET ?    
    `;
    // Execute query
    const [rows, fields] = await db.query(query, [userId, limit, offset]);

    // Send response with posts data
    res.status(200).json({ posts: rows });
  } catch (err) {
    console.error("Error getting recent posts by friends:", err);
    res.status(500).json({ error: "Error getting recent posts by friends" });
  }
};
