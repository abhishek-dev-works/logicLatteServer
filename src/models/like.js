// Like Model
class Like {
    constructor(like_id, user_id, post_id, comment_id, liked, updated_at) {
      this.like_id = like_id;
      this.user_id = user_id;
      this.post_id = post_id;
      this.comment_id = comment_id;
      this.liked = liked;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = Like;
  