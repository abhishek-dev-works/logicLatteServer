// User Model
class User {
    constructor(user_id, username, email, password, full_name, bio, profile_picture, created_at, updated_at) {
      this.user_id = user_id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.full_name = full_name;
      this.bio = bio;
      this.profile_picture = profile_picture;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = User;
  