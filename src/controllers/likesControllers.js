const Like = require('../models/like');
const Post = require('../models/post'); // Assuming you have a Post model

// Like a post
exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    // Create a new like
    const newLike = new Like({ postId, userId });
    await newLike.save();

    return res.status(200).json({ message: 'Post liked successfully', like: newLike });
  } catch (err) {
    console.error('Error liking the post:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the like exists
    const like = await Like.findOne({ postId, userId });
    if (!like) {
      return res.status(400).json({ message: 'Like not found' });
    }

    // Remove the like
    await Like.deleteOne({ postId, userId });

    return res.status(200).json({ message: 'Post unliked successfully' });
  } catch (err) {
    console.error('Error unliking the post:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
