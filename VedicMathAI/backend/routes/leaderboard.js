const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get Leaderboard
router.get("/", async (req, res) => {
  const leaderboard = await User.find().sort({ score: -1 }).limit(10);
  res.json(leaderboard);
});

module.exports = router;
