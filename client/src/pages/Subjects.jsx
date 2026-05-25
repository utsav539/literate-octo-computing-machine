import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Subjects = () => {
  const subjects = [
    { name: 'Physics', progress: 72, color: '#3B82F6', hours: 45 },
    { name: 'Chemistry', progress: 58, color: '#EC4899', hours: 38 },
    { name: 'Mathematics', progress: 64, color: '#8B5CF6', hours: 52 },
    { name: 'Biology', progress: 81, color: '#10B981', hours: 41 },
  ];

  const mockData = [
    { week: 'Week 1', Physics: 8, Chemistry: 6, Mathematics: 10, Biology: 7 },
    { week: 'Week 2', Physics: 9, Chemistry: 7, Mathematics: 12, Biology: 8 },
    { week: 'Week 3', Physics: 10, Chemistry: 8, Mathematics: 11, Biology: 9 },
    { week: 'Week 4', Physics: 11, Chemistry: 9, Mathematics: 13, Biology: 10 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold gradient-text">Subjects</h1>
        <p className="text-slate-400 mt-2">Track your progress across all subjects</p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-morphism rounded-2xl p-6 border border-slate-700/50 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{subject.name}</h3>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${subject.color}20` }}
              >
                <BookOpen size={20} style={{ color: subject.color }} />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-slate-400 text-sm">Progress</span>
                <span style={{ color: subject.color }} className="font-bold">{subject.progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.progress}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: subject.color }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Zap size={16} />
              <span>{subject.hours} hours studied</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Study Time Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-morphism rounded-3xl p-8 border border-slate-700/50"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-blue-400" size={24} />
          <h2 className="text-2xl font-bold gradient-text">Study Time Trends</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="week" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Line type="monotone" dataKey="Physics" stroke="#3B82F6" />
            <Line type="monotone" dataKey="Chemistry" stroke="#EC4899" />
            <Line type="monotone" dataKey="Mathematics" stroke="#8B5CF6" />
            <Line type="monotone" dataKey="Biology" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Subject Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="glass-morphism rounded-2xl p-6 border border-slate-700/50"
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: subject.color }}>{subject.name} Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-2">Strengths</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Core Concepts</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Problem Solving</span>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Areas to Improve</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">Numerical</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">Applications</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Subjects;
