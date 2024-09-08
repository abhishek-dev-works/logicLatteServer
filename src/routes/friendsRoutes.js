const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsControllers'); // Adjust path as needed

// Define routes for friend controller
router.post('/add', friendsController.addFriend); // Add a friend
router.delete('/remove', friendsController.removeFriend); // Remove a friend
router.get('/user/:user_id', friendsController.getFriendsByUserId); // Get friends by user ID
router.get('/suggestions/:user_id', friendsController.getFriendSuggestions); // Get friend suggestions

module.exports = router;
