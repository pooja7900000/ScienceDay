const express = require("express");
const QuizResult = require("../models/QuizResult");

const router = express.Router();

// Save Quiz Score
router.post("/submit", async (req, res) => {
  const { userId, score } = req.body;
  const result = new QuizResult({ userId, score });
  await result.save();
  res.json({ success: true, message: "Quiz Submitted" });
});

module.exports = router;
