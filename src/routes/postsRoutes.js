const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsControllers');

// Define routes for skills controller
router.post("/post", postsController.createPost);
router.put("/post/:id", postsController.updatePost);
router.delete("/post/:id", postsController.deletePost);
router.get("post/user/:id", postsController.getPostsbyUserId);

module.exports = router;
