const mongoose = require("mongoose");

const chatStatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to User model
    required: true,
  },
  totalChats: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Ensure one record per user
chatStatsSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model("ChatStats", chatStatsSchema);
