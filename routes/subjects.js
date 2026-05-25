const express = require('express');
const Subject = require('../models/Subject');
authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all subjects for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.userId });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single subject
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const subject = await Subject.findOne({ _id: req.params.id, userId: req.userId });
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or initialize subject
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, color } = req.body;

    let subject = await Subject.findOne({ userId: req.userId, name });
    if (subject) {
      return res.status(400).json({ message: 'Subject already exists' });
    }

    subject = new Subject({
      userId: req.userId,
      name,
      color: color || '#3B82F6'
    });

    await subject.save();
    res.status(201).json({ message: 'Subject created successfully', subject });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update subject progress
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { progress, strengths, weaknesses, chapters } = req.body;
    const subject = await Subject.findOne({ _id: req.params.id, userId: req.userId });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    if (progress !== undefined) subject.progress = progress;
    if (strengths) subject.strengths = strengths;
    if (weaknesses) subject.weaknesses = weaknesses;
    if (chapters) subject.chapters = chapters;
    subject.updatedAt = new Date();

    await subject.save();
    res.json({ message: 'Subject updated successfully', subject });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;