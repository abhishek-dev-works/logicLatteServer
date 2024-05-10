const db = require("../db");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      users: allUsers,
    });
  } catch (err) {
    console.log("Error getting all users: ", err);
    res.status(500).json({
      message: "Failed to fetch all the users",
    });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ user_id: id });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    console.error("Error getting a user:", err);
    res.status(500).json({ error: "Error getting a user" });
  }
};

exports.createUser = async (req, res) => {
  const { username, email, password, full_name, bio, gender } = req.body;
  try {
    if (!email || !username || !full_name || !password) {
      res.status(400).json({
        message: "Fill all the fields",
      });
    }

    const existingUser = await User.findOne({ username: username });
    const foundEmail = await User.findOne({ email: email });

    if (existingUser || foundEmail) {
      res.status(400).json({
        message: "User already exists!!",
      });
    }

    const lowerEmail = email.toLowerCase();

    const newUser = User({
      user_id: uuidv4(),
      email: lowerEmail,
      username,
      password,
      full_name,
      gender,
      bio,
    });

    await newUser.save();
    res.status(200).json({
      message: "User Created!!",
    });
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

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, full_name, gender, bio } = req.body;
  try {
    const nonExistingUser = User.findOne({ user_id: id });

    if (!nonExistingUser) {
      res.status(400).json({
        message: "User does not exist",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { username, email, password, full_name, gender, bio },
      { new: true }
    );

    res.status(200).json({
      message: "User updated, successfully",
      updatedUser: updatedUser,
    });
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
