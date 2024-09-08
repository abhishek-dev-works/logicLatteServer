const Message = require("../models/message");

// Endpoint to get all messages between two users
exports.getAllMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) {
      return res
        .status(400)
        .json({ error: "Both userId1 and userId2 are required." });
    }

    // Fetch all messages between two users
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ timestamp: 1 }); // Sorted by timestamp, ascending

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch messages." });
  }
};

// Endpoint to get the user's inbox (list of last messages with each user)
exports.getUserInbox = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required." });
    }

    // Find all messages involving the user
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ timestamp: -1 }); // Sort by timestamp, descending (latest first)

    // Create a map for each user, storing the last message with them
    const inbox = {};
    messages.forEach((msg) => {
      const otherUser = msg.sender === userId ? msg.receiver : msg.sender;
      if (!inbox[otherUser]) {
        inbox[otherUser] = msg;
      }
    });

    // Convert the map into an array of conversations
    const conversationList = Object.keys(inbox).map((otherUserId) => ({
      userId: otherUserId,
      lastMessage: inbox[otherUserId],
    }));

    return res.status(200).json({ conversations: conversationList });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch inbox." });
  }
};
