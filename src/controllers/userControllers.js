const db = require("../db");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Error getting users:", err);
    res.status(500).json({ error: "Error getting users" });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows, fields] = await db.query(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ error: "Error getting user" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { username, email, password, full_name, bio, gender, profile_picture } =
    req.body;
  try {
    const date = new Date();
    const [result] = await db.query(
      `INSERT INTO users 
      (username, email, password, full_name, bio, gender, profile_picture, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        email,
        password,
        full_name,
        bio,
        gender,
        profile_picture,
        date,
        date,
      ]
    );
    res.status(201).json({ id: result.insertId, username, email });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error creating user" });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, full_name, bio, gender, profile_picture } =
    req.body;
  try {
    const date = new Date();
    const [result] = await db.query(
      `UPDATE users SET username = ?, email = ?, password = ?, full_name = ?, bio = ?, gender = ? , profile_picture = ?, updated_at = ?  WHERE user_id = ?`,
      [
        username,
        email,
        password,
        full_name,
        bio,
        gender,
        profile_picture,
        date,
        id,
      ]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Error deleting user" });
  }
};

exports.Authenticate = async (req, res) => {
  console.log(req, res);
  const { email, password } = req.body;
  try {
    const [rows, fields] = await db.query(
      "Select * from users where email =? and password = ?",
      [email, password]
    );
    if (rows.length > 0) {
      console.log(rows);
      res.status(200).json({ message: "Authentication Successfull" });
    } else {
      res.status(400).json({ error: "Incorrect email or password" });
    }
  } catch (err) {
    console.error("Error Authenticating user:", err);
    res.status(500).json({ error: "Internal Server error" });
  }
};
