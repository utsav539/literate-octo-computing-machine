const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'History', 'Geography']
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  chapters: [
    {
      name: String,
      completed: { type: Boolean, default: false },
      topics: [String],
      difficulty: { type: String, enum: ['easy', 'medium', 'hard'] }
    }
  ],
  totalStudyTime: {
    type: Number,
    default: 0 // in minutes
  },
  strengths: [String],
  weaknesses: [String],
  lastReviewDate: Date,
  color: {
    type: String,
    default: '#3B82F6'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', subjectSchema);