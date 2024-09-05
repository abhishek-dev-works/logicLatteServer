const { Schema, model } = require("mongoose");

const friendSchema = new Schema({
  user_id: { required: true, type: String, ref: "User" },
  friend_id: { required: true, type: String, ref: "User" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = model("Friends", friendSchema);
