const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');
const { validateTask } = require('../middleware/validators');

const router = express.Router();

// Get all tasks for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, subject, priority } = req.query;
    const filter = { userId: req.userId };

    if (status) filter.status = status;
    if (subject) filter.subject = subject;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single task
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create task
router.post('/', authMiddleware, validateTask, async (req, res) => {
  try {
    const { title, description, subject, priority, dueDate, estimatedTime, tags } = req.body;

    const task = new Task({
      userId: req.userId,
      title,
      description,
      subject,
      priority,
      dueDate,
      estimatedTime,
      tags: tags || []
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, actualTime, subtasks } = req.body;
    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (status) task.status = status;
    if (actualTime) task.actualTime = actualTime;
    if (subtasks) task.subtasks = subtasks;
    if (status === 'completed') task.completedAt = new Date();

    task.updatedAt = new Date();
    await task.save();

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;