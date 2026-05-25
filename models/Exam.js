const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subject: String,
  examDate: {
    type: Date,
    required: true
  },
  daysRemaining: Number,
  syllabus: [String],
  topicsToRevise: [String],
  mockTests: [
    {
      name: String,
      score: Number,
      totalMarks: Number,
      percentage: Number,
      takenDate: Date,
      analysis: String
    }
  ],
  studyPlan: [
    {
      week: Number,
      topics: [String],
      completed: Boolean
    }
  ],
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exam', examSchema);