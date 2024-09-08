const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likesControllers');

// Endpoint to like a post
router.post('/like', likeController.likePost);

// Endpoint to unlike a post
router.post('/unlike', likeController.unlikePost);

module.exports = router;
