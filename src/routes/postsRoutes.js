const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsControllers');

// Define routes for posts controller
router.post("/", postsController.createPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);
router.get("/user/:id", postsController.getPostsbyUserId);

module.exports = router;
