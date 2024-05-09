// Friends Model
class Friend {
    constructor(friendship_id, user1_id, user2_id, created_at) {
      this.friendship_id = friendship_id;
      this.user1_id = user1_id;
      this.user2_id = user2_id;
      this.created_at = created_at;
    }
  }
  
  module.exports = Friend;
  