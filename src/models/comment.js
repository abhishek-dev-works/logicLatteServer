// Comment Model
class Comment {
    constructor(comment_id, post_id, user_id, content, created_at, updated_at) {
      this.comment_id = comment_id;
      this.post_id = post_id;
      this.user_id = user_id;
      this.content = content;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = Comment;
  