const MeditationLog = require("../models/MeditationLog");

const logMeditation = async (req, res) => {
  try {
    const { userId, meditationId } = req.body;

    // find if log exists
    let log = await MeditationLog.findOne({ userId, meditationId });

    if (log) {
      log.count += 1;
      log.lastCompleted = new Date();
      await log.save();
    } else {
      log = await MeditationLog.create({ userId, meditationId });
    }

    res.status(200).json({ message: "Meditation logged successfully", log });
  } catch (error) {
    res.status(500).json({ message: "Error logging meditation", error });
  }
};

const getMeditationLogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await MeditationLog.find({ userId });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching meditation logs", error });
  }
};

module.exports = { logMeditation, getMeditationLogs };
