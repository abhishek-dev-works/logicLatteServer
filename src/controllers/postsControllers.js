// postController.js
const upload = require("../middleware/multer");
const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const Like = require("../models/like");
const Friend = require("../models/friend");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

exports.createPost = async (req, res) => {
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const { user_id, heading, content } = req.body;
    try {
      let imageUrl = null;
      let videoUrl = null;

      // Save image if present
      if (req.files["image"]) {
        const image = req.files["image"][0];
        imageUrl = `middleware/uploads/${user_id}/${image.filename}`; // Full URL to access the image
      }

      // Save video if present
      if (req.files["video"]) {
        const video = req.files["video"][0];
        videoUrl = `middleware/uploads/${user_id}/${video.filename}`; // Full URL to access the video
      }

      // Create the post in MongoDB
      const newPost = new Post({
        user_id,
        heading,
        content,
        image_url: imageUrl,
        video_url: videoUrl,
        post_id: uuidv4(),
      });

      await newPost.save();
      res
        .status(200)
        .json({ message: "Post created successfully", post: newPost });
    } catch (err) {
      console.log("Failed to create post", err);
      res.status(500).json({ error: "Failed to create post" });
    }
  });
};

exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ user_id: userId });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }

    // Return all posts with image and video URLs
    const postsWithMediaUrls = posts.map((post) => {
      return {
        _id: post._id,
        user_id: post.user_id,
        heading: post.heading,
        content: post.content,
        image_url: post.image_url
          ? `${req.protocol}://${req.get("host")}/${post.image_url}`
          : null, // Construct full URL for the image
        video_url: post.video_url
          ? `${req.protocol}://${req.get("host")}/${post.video_url}`
          : null, // Construct full URL for the video
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });

    res.status(200).json(postsWithMediaUrls);
  } catch (err) {
    console.log("Failed to get posts", err);
    res.status(500).json({ error: "Failed to get posts" });
  }
};

// Endpoint to get the user's feed (posts from friends)
exports.getUserFeed = async (req, res) => {
  const { userId } = req.params;

  try {
    // Step 1: Fetch all friends' user IDs from the Friend model
    const friends = await Friend.find({ user_id: userId });
    const friendIds = friends.map(friend => friend.friend_id);

    // Step 2: Fetch posts from friends
    const posts = await Post.find({ user_id: { $in: friendIds } })
      .sort({ createdAt: -1 }); // Optionally sort posts by newest first

    // Step 3: For each post, check if the user has liked it and get the like count
    const feed = await Promise.all(
      posts.map(async (post) => {
        const isLiked = await Like.findOne({ postId: post._id, userId: userId });
        const likeCount = await Like.countDocuments({ postId: post._id });

        // Spread the post object and add `isLiked` and `likeCount`
        return {
          ...post.toObject(),  // Convert Mongoose document to plain JS object
          image_url: post.image_url
          ? `${req.protocol}://${req.get("host")}/${post.image_url}`
          : null, // Construct full URL for the image
        video_url: post.video_url
          ? `${req.protocol}://${req.get("host")}/${post.video_url}`
          : null, // Construct full URL for the video
          isLiked: !!isLiked,  // True if user has liked the post
          likeCount            // Total number of likes on the post
        };
      })
    );

    res.status(200).json({ feed });
  } catch (err) {
    console.error("Failed to get user feed", err);
    res.status(500).json({ error: "Failed to get user feed" });
  }
};