const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsControllers');

router.post('/post', postsController.createPost);
// router.put('/post/:id', postsController.updatePost);
// router.delete('/post/:id', postsController.deletePost);
// router.get('/post/user/:id', postsController.getPostsbyUserId);
router.get('/post/:id',postsController.getUserPosts);

module.exports = router;
