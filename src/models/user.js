const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  user_id: { required: true, type: Number },
  username: { required: true, type: String },
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  full_name: { required: true, type: String },
  profile_picture: { type: String },
  gender: { type: String },
  bio : {type: String},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = model("User", userSchema);
