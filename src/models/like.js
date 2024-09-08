const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post', // Reference to the Post model
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
