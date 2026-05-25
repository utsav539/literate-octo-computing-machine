const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get global leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ xp: -1 })
      .limit(100)
      .select('username xp rank badge totalTasksCompleted studyStreak');
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user rank
router.get('/user-rank', authMiddleware, async (req, res) => {
  try {
    const userRank = await Leaderboard.findOne({ userId: req.userId });
    if (!userRank) {
      return res.status(404).json({ message: 'User not in leaderboard yet' });
    }
    res.json(userRank);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user XP and rank
router.post('/update-xp', authMiddleware, async (req, res) => {
  try {
    const { xpEarned } = req.body;
    
    let userRank = await Leaderboard.findOne({ userId: req.userId });
    if (!userRank) {
      userRank = new Leaderboard({ userId: req.userId });
    }

    userRank.xp += xpEarned;
    userRank.updatedAt = new Date();
    await userRank.save();

    // Update rank
    const allUsers = await Leaderboard.find().sort({ xp: -1 });
    const newRank = allUsers.findIndex(u => u._id.toString() === userRank._id.toString()) + 1;
    userRank.rank = newRank;
    await userRank.save();

    res.json({ message: 'XP updated', userRank });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;