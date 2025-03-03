const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  score: Number,
});

module.exports = mongoose.model("QuizResult", QuizResultSchema);

