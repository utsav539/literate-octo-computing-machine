import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Trash2, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const Exams = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      name: 'Physics Mid-Term',
      subject: 'Physics',
      date: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000),
      progress: 72,
      mockTests: 3,
    },
    {
      id: 2,
      name: 'Chemistry Final',
      subject: 'Chemistry',
      date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      progress: 58,
      mockTests: 2,
    },
    {
      id: 3,
      name: 'Math Quarterly',
      subject: 'Mathematics',
      date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      progress: 85,
      mockTests: 5,
    },
  ]);

  const getDaysRemaining = (date) => {
    const today = new Date();
    const diff = date - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const deleteExam = (id) => {
    setExams(exams.filter(exam => exam.id !== id));
    toast.success('Exam removed!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Exams</h1>
          <p className="text-slate-400 mt-2">Prepare for your upcoming exams with focused study plans</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Exam
        </motion.button>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam, index) => {
          const daysLeft = getDaysRemaining(exam.date);
          const urgency = daysLeft <= 7 ? 'high' : daysLeft <= 14 ? 'medium' : 'low';

          return (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-morphism rounded-2xl p-6 border card-hover relative ${
                urgency === 'high' ? 'border-red-500/50' :
                urgency === 'medium' ? 'border-yellow-500/50' :
                'border-slate-700/50'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <BookOpen
                  size={24}
                  className={`${
                    urgency === 'high' ? 'text-red-400' :
                    urgency === 'medium' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}
                />
                <button
                  onClick={() => deleteExam(exam.id)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-red-400" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{exam.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{exam.subject}</p>

              {/* Countdown */}
              <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-slate-700">
                <p className="text-slate-400 text-xs mb-1">Days Remaining</p>
                <p className={`text-3xl font-bold ${
                  urgency === 'high' ? 'text-red-400' :
                  urgency === 'medium' ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {daysLeft}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Preparation Progress</span>
                  <span className="text-sm font-bold text-blue-400">{exam.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${exam.progress}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>

              {/* Mock Tests */}
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>📝 {exam.mockTests} mock tests completed</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Study Plan Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-morphism rounded-3xl p-8 border border-slate-700/50"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar size={24} className="text-blue-400" />
          <h2 className="text-2xl font-bold gradient-text">Study Plan Template</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { week: 'Week 1-2', focus: 'Fundamentals Review', tasks: 15 },
            { week: 'Week 3-4', focus: 'Core Concepts', tasks: 20 },
            { week: 'Week 5-6', focus: 'Practice Problems', tasks: 25 },
            { week: 'Week 7+', focus: 'Mock Tests & Revision', tasks: 30 },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="bg-slate-800/50 rounded-xl p-4 border border-slate-700"
            >
              <h4 className="font-bold text-blue-400 mb-2">{plan.week}</h4>
              <p className="text-white font-semibold mb-2">{plan.focus}</p>
              <p className="text-slate-400 text-sm">~{plan.tasks} tasks</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Exams;
