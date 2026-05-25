const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  topic: String,
  notes: String,
  productivityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  breaksTaken: {
    type: Number,
    default: 0
  },
  distractions: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  dayOfWeek: String,
  timeOfDay: String // morning, afternoon, evening, night
});

module.exports = mongoose.model('StudySession', studySessionSchema);