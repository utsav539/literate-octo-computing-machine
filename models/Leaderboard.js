const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: String,
  xp: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  },
  totalTasksCompleted: {
    type: Number,
    default: 0
  },
  studyStreak: {
    type: Number,
    default: 0
  },
  badge: String,
  weekNumber: Number,
  yearNumber: Number,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);