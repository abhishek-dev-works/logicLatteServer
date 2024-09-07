const Message = require('../models/message'); // Message schema
let io;
const users = {}; // To keep track of connected users

function initializeSocket(httpServer) {
  const { Server } = require('socket.io');
  io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Register user
    socket.on('register', (userId) => {
      users[userId] = socket.id;
      console.log(`User ${userId} is now connected with socket id ${socket.id}`);
    });

    // Handle message sending
    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
      try {
        // Save message to MongoDB
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
        });
        await newMessage.save();

        // Emit real-time chat message
        if (users[receiverId]) {
          io.to(users[receiverId]).emit('receiveMessage', newMessage);
        }

        // Emit notification message
        if (users[receiverId]) {
          io.to(users[receiverId]).emit('newNotification', {
            senderId,
            message: 'You have a new message!',
          });
        }
      } catch (error) {
        console.log('Error sending message:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      // Optionally remove user from the users object here if needed
    });
  });
}

function emitMessageToUser(userId, message) {
  if (users[userId]) {
    io.to(users[userId]).emit('receiveMessage', message);
  }
}

module.exports = { initializeSocket, emitMessageToUser };
