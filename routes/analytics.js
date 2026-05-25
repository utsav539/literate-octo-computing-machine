const express = require('express');
const Task = require('../models/Task');
const StudySession = require('../models/StudySession');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user analytics
router.get('/user-stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const tasks = await Task.find({ userId: req.userId });
    const studySessions = await StudySession.find({ userId: req.userId });

    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalStudyTime = studySessions.reduce((sum, s) => sum + s.duration, 0);

    const stats = {
      totalTasks: tasks.length,
      completedTasks,
      pendingTasks: tasks.filter(t => t.status !== 'completed').length,
      totalStudyTime,
      averageSessionLength: studySessions.length > 0 ? totalStudyTime / studySessions.length : 0,
      dailyStreak: user.dailyStreak,
      totalXP: user.totalXP,
      attendancePercentage: user.attendancePercentage
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get weekly study data
router.get('/weekly-data', authMiddleware, async (req, res) => {
  try {
    const studySessions = await StudySession.find({ userId: req.userId });
    
    const weeks = {};
    studySessions.forEach(session => {
      const weekNum = Math.ceil(new Date(session.timestamp).getDate() / 7);
      if (!weeks[`Week ${weekNum}`]) {
        weeks[`Week ${weekNum}`] = 0;
      }
      weeks[`Week ${weekNum}`] += session.duration;
    });

    res.json(weeks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get subject-wise progress
router.get('/subject-progress', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    const subjectProgress = {};

    tasks.forEach(task => {
      if (!subjectProgress[task.subject]) {
        subjectProgress[task.subject] = { total: 0, completed: 0 };
      }
      subjectProgress[task.subject].total++;
      if (task.status === 'completed') {
        subjectProgress[task.subject].completed++;
      }
    });

    const progress = Object.keys(subjectProgress).map(subject => ({
      subject,
      percentage: Math.round(
        (subjectProgress[subject].completed / subjectProgress[subject].total) * 100
      )
    }));

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Log study session
router.post('/session', authMiddleware, async (req, res) => {
  try {
    const { subject, duration, topic, notes, productivityScore } = req.body;
    const now = new Date();

    const session = new StudySession({
      userId: req.userId,
      subject,
      duration,
      topic,
      notes,
      productivityScore,
      dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
      timeOfDay: getTimeOfDay(now)
    });

    await session.save();
    res.status(201).json({ message: 'Study session logged', session });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

function getTimeOfDay(date) {
  const hour = date.getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

module.exports = router;