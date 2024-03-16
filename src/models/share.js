// Shares Model
class Share {
    constructor(share_id, original_post_id, user_id, mention_user_id, shared_on) {
      this.share_id = share_id;
      this.original_post_id = original_post_id;
      this.user_id = user_id;
      this.mention_user_id = mention_user_id;
      this.shared_on = shared_on;
    }
  }
  
  module.exports = Share;
  