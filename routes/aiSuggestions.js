const express = require('express');
const Task = require('../models/Task');
const StudySession = require('../models/StudySession');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get AI-powered study suggestions
router.get('/suggestions', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const studySessions = await StudySession.find({ userId: req.userId }).sort({ timestamp: -1 }).limit(30);
    const tasks = await Task.find({ userId: req.userId });

    const suggestions = [];

    // Suggestion 1: Best study time
    const timeOfDayStats = {};
    studySessions.forEach(session => {
      if (!timeOfDayStats[session.timeOfDay]) {
        timeOfDayStats[session.timeOfDay] = { totalSessions: 0, avgProductivity: 0 };
      }
      timeOfDayStats[session.timeOfDay].totalSessions++;
      timeOfDayStats[session.timeOfDay].avgProductivity += session.productivityScore || 0;
    });

    let bestTime = 'evening';
    let maxProductivity = 0;
    for (const [time, stats] of Object.entries(timeOfDayStats)) {
      const avgProductivity = stats.avgProductivity / stats.totalSessions;
      if (avgProductivity > maxProductivity) {
        maxProductivity = avgProductivity;
        bestTime = time;
      }
    }

    suggestions.push(`Best study performance detected between ${bestTime} hours. Try scheduling important tasks then!`);

    // Suggestion 2: Focus on weak subjects
    const weakSubjects = await getWeakSubjects(req.userId);
    if (weakSubjects.length > 0) {
      suggestions.push(`Focus on ${weakSubjects[0]} weak topics today. You've been spending less time on this.`);
    }

    // Suggestion 3: Daily streak motivation
    if (user.dailyStreak > 0) {
      suggestions.push(`🔥 Your ${user.dailyStreak} day streak is impressive! Keep it going!`);
    } else {
      suggestions.push('Start your study streak today by completing at least one task!');
    }

    // Suggestion 4: Pending tasks
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    if (pendingTasks > 5) {
      suggestions.push(`You have ${pendingTasks} pending tasks. Prioritize by deadline!`);
    }

    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get personalized study plan
router.get('/study-plan', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    const studies = await StudySession.find({ userId: req.userId }).limit(7);

    const plan = {
      todayTasks: tasks.filter(t => new Date(t.dueDate).toDateString() === new Date().toDateString()),
      weeklyGoal: calculateWeeklyGoal(studies),
      recommendations: []
    };

    // Add recommendations based on patterns
    if (studies.length < 3) {
      plan.recommendations.push('Try to study at least 3 times per week for better retention.');
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

async function getWeakSubjects(userId) {
  const tasks = await Task.find({ userId });
  const subjectStats = {};

  tasks.forEach(task => {
    if (!subjectStats[task.subject]) {
      subjectStats[task.subject] = { total: 0, completed: 0 };
    }
    subjectStats[task.subject].total++;
    if (task.status === 'completed') {
      subjectStats[task.subject].completed++;
    }
  });

  return Object.keys(subjectStats)
    .map(subject => ({
      subject,
      percentage: (subjectStats[subject].completed / subjectStats[subject].total) * 100
    }))
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3)
    .map(item => item.subject);
}

function calculateWeeklyGoal(studies) {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());

  const weekStudies = studies.filter(s => new Date(s.timestamp) >= weekStart);
  const totalMinutes = weekStudies.reduce((sum, s) => sum + s.duration, 0);
  const goal = 300; // 5 hours per week

  return {
    target: goal,
    completed: totalMinutes,
    percentage: Math.round((totalMinutes / goal) * 100)
  };
}

module.exports = router;