const express = require('express');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Timer session tracking (in-memory for now, can be moved to DB)
const timerSessions = {};

// Start timer session
router.post('/start', authMiddleware, (req, res) => {
  try {
    const { duration, subject } = req.body;
    const sessionId = `${req.userId}-${Date.now()}`;

    timerSessions[sessionId] = {
      userId: req.userId,
      duration,
      subject,
      startTime: Date.now(),
      endTime: Date.now() + duration * 60 * 1000
    };

    res.json({ message: 'Timer started', sessionId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get timer status
router.get('/status/:sessionId', authMiddleware, (req, res) => {
  try {
    const session = timerSessions[req.params.sessionId];
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const timeRemaining = Math.max(0, session.endTime - Date.now());
    res.json({ timeRemaining, isCompleted: timeRemaining === 0 });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Complete timer session
router.post('/complete/:sessionId', authMiddleware, (req, res) => {
  try {
    const session = timerSessions[req.params.sessionId];
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    delete timerSessions[req.params.sessionId];
    res.json({ message: 'Timer session completed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;