// Post Model
class Post {
    constructor(post_id, user_id, content, image_url, video_url, created_at, updated_at) {
      this.post_id = post_id;
      this.user_id = user_id;
      this.content = content;
      this.image_url = image_url;
      this.video_url = video_url;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = Post;
  