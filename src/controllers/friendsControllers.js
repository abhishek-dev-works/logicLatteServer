const Friend = require("../models/friend");
const User = require("../models/user");

// Endpoint to add a friend
exports.addFriend = async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    // Create friendship record
    const friend = new Friend({ user_id, friend_id });
    await friend.save();

    // Optionally create a reciprocal friendship record if needed
    const reciprocalFriend = new Friend({ user_id: friend_id, friend_id: user_id });
    await reciprocalFriend.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (err) {
    console.error("Failed to add friend", err);
    res.status(500).json({ error: "Failed to add friend" });
  }
};

// Endpoint to remove a friend
exports.removeFriend = async (req, res) => {
  const { user_id, friend_id } = req.body;
  try {
    // Remove friendship record
    await Friend.deleteOne({ user_id, friend_id });

    // Optionally remove the reciprocal friendship record
    await Friend.deleteOne({ user_id: friend_id, friend_id: user_id });

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (err) {
    console.error("Failed to remove friend", err);
    res.status(500).json({ error: "Failed to remove friend" });
  }
};

// Endpoint to get all friends of a user
exports.getFriendsByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const friends = await Friend.find({ user_id });
    const users = await User.find({ user_id: { $in: friends.map(friend => friend.friend_id) } });

    res.status(200).json({ results: {friends: users} });
  } catch (err) {
    console.error("Failed to get friends", err);
    res.status(500).json({ error: "Failed to get friends" });
  }
};

exports.getFriendSuggestions = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Fetch the IDs of users who are currently friends with the given user
    const friends = await Friend.find({ user_id });
    const friendIds = friends.map(friend => friend.friend_id);

    // Fetch all users excluding those who are already friends
    const suggestedFriends = await User.find({ user_id: { $ne: user_id, $nin: friendIds } });

    res.status(200).json({ suggestions: suggestedFriends });
  } catch (err) {
    console.error("Failed to get friend suggestions", err);
    res.status(500).json({ error: "Failed to get friend suggestions" });
  }
};
