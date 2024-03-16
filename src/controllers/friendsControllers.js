const db = require("../db");

// Endpoint to add a friend
exports.addFriend = async (req, res) => {
  const { user1_id, user2_id } = req.body;
  try {
    const [rows, fields] = await db.query(
      `INSERT INTO friends (user1_id, user2_id) VALUES (?,?)`,
      [user1_id, user2_id]
    );
    res.status(200).json({ message: "Friend added successfully" });
  } catch (err) {
    console.log("Failed to add friend", err);
    res.status(500).json({ error: "Failed to add friend" });
  }
};

// Endpoint to remove a friend
exports.removeFriend = async (req, res) => {
  const { user1_id, user2_id } = req.body;
  try {
    const [rows, fields] = await db.query(
      `DELETE FROM friends WHERE user1_id = ? AND user2_id = ?`,
      [user1_id, user2_id]
    );
    res.status(200).json({ message: "Friend removed successfully" });
  } catch (err) {
    console.log("Failed to remove friend", err);
    res.status(500).json({ error: "Failed to remove friend" });
  }
};

// Endpoint to get all friends of a user
exports.getFriendsByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows, fields] = await db.query(
      `SELECT * FROM friends WHERE user1_id = ? OR user2_id = ?`,
      [user_id, user_id]
    );
    res.status(200).json({ results: rows });
  } catch (err) {
    console.log("Failed to get friends", err);
    res.status(500).json({ error: "Failed to get friends" });
  }
};
