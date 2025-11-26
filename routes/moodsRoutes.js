// src/routes/moods.js
const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

router.post("/", async (req, res) => {
  try {
    const { userId, mood, note } = req.body; 
    const newMood = await Mood.create({ user: userId, mood, note });
    res.status(201).json(newMood);
  } catch (error) {
    res.status(500).json({ message: "Failed to save mood", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query; 
    const moods = await Mood.find({ user: userId }).sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch moods", error });
  }
});

module.exports = router;
