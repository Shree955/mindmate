const ChatStats = require("../models/chatStats");

// Increment chat count for a specific user
const incrementChatCount = async (req, res) => {
  try {
    const { userId } = req.body; // or req.user.id if using auth middleware

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let stats = await ChatStats.findOne({ userId });

    if (!stats) {
      stats = new ChatStats({ userId });
    }

    stats.totalChats += 1;
    stats.lastUpdated = new Date();

    await stats.save();

    res.status(200).json({
      message: "User chat count updated successfully",
      totalChats: stats.totalChats,
    });
  } catch (error) {
    console.error("Error updating user chat count:", error);
    res.status(500).json({ message: "Error updating user chat count" });
  }
};

// Get chat count for a specific user
const getChatCount = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const stats = await ChatStats.findOne({ userId });
    res.status(200).json({ totalChats: stats ? stats.totalChats : 0 });
  } catch (error) {
    console.error("Error fetching user chat count:", error);
    res.status(500).json({ message: "Error fetching user chat count" });
  }
};

module.exports = { incrementChatCount, getChatCount };
