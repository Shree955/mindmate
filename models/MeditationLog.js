const mongoose = require("mongoose");

const meditationLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meditationId: { type: String, required: true }, // e.g., mindful_breathing
  count: { type: Number, default: 1 }, // number of times completed
  lastCompleted: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MeditationLog", meditationLogSchema);
