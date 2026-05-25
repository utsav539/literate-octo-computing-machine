import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnalyticsStore } from '../store/analyticsStore';
import { useTaskStore } from '../store/taskStore';
import StatCard from '../components/StatCard';
import PomodoroTimer from '../components/PomodoroTimer';
import { Flame, Clock, Zap, Lightbulb, BarChart3, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { stats, weeklyData, subjectProgress, suggestions, fetchStats } = useAnalyticsStore();
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchStats();
    fetchTasks();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const chartData = Object.entries(weeklyData || {}).map(([week, hours]) => ({
    name: week,
    hours: Math.round(hours / 60)
  }));

  const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#06B6D4'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here's your study progress</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Flame}
          label="Daily Streak"
          value={`${stats?.dailyStreak || 0}🔥`}
          color="text-red-400"
          trend="Keep it up!"
        />
        <StatCard
          icon={Clock}
          label="Study Hours"
          value={`${Math.round((stats?.totalStudyTime || 0) / 60)}h`}
          color="text-blue-400"
          trend="+2.5h this week"
        />
        <StatCard
          icon={Zap}
          label="Pending Tasks"
          value={stats?.pendingTasks || 0}
          color="text-yellow-400"
          trend="2 due today"
        />
        <StatCard
          icon={TrendingUp}
          label="Completion Rate"
          value={`${Math.round((stats?.completedTasks / (stats?.totalTasks || 1)) * 100) || 0}%`}
          color="text-green-400"
          trend="↑ 5% increase"
        />
      </motion.div>

      {/* Timer and AI Suggestions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PomodoroTimer />
        </div>
        <motion.div className="lg:col-span-2 glass-morphism rounded-3xl p-8 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="text-yellow-400" size={24} />
            <h2 className="text-2xl font-bold gradient-text">AI Study Suggestions</h2>
          </div>
          <div className="space-y-4">
            {suggestions?.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 border-l-4 border-blue-500 p-4 rounded-lg"
                >
                  <p className="text-slate-300">{suggestion}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-slate-400">No suggestions yet. Complete some tasks to get personalized insights!</p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <motion.div className="glass-morphism rounded-3xl p-8 border border-slate-700/50">
          <h2 className="text-2xl font-bold mb-6 gradient-text">📊 Weekly Study Hours</h2>
          {chartData?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Bar dataKey="hours" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-400 text-center py-8">No data yet</p>
          )}
        </motion.div>

        {/* Subject Progress */}
        <motion.div className="glass-morphism rounded-3xl p-8 border border-slate-700/50">
          <h2 className="text-2xl font-bold mb-6 gradient-text">📚 Subject Progress</h2>
          {subjectProgress?.length > 0 ? (
            <div className="space-y-4">
              {subjectProgress.slice(0, 4).map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-slate-300">{subject.subject}</span>
                    <span className="text-blue-400 font-bold">{subject.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-center py-8">Add tasks to see progress</p>
          )}
        </motion.div>
      </motion.div>

      {/* Upcoming Tasks */}
      <motion.div variants={itemVariants} className="glass-morphism rounded-3xl p-8 border border-slate-700/50">
        <h2 className="text-2xl font-bold mb-6 gradient-text">✅ Upcoming Tasks</h2>
        {tasks?.length > 0 ? (
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-semibold text-slate-200">{task.title}</p>
                  <p className="text-xs text-slate-400">{task.subject}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">No tasks yet. Create one to get started!</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
