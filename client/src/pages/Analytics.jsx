import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

const Analytics = () => {
  const productivityData = [
    { time: '6 AM', productivity: 40 },
    { time: '9 AM', productivity: 75 },
    { time: '12 PM', productivity: 60 },
    { time: '3 PM', productivity: 45 },
    { time: '6 PM', productivity: 85 },
    { time: '9 PM', productivity: 70 },
  ];

  const subjectData = [
    { name: 'Physics', value: 45, color: '#3B82F6' },
    { name: 'Chemistry', value: 38, color: '#EC4899' },
    { name: 'Mathematics', value: 52, color: '#8B5CF6' },
    { name: 'Biology', value: 41, color: '#10B981' },
  ];

  const weeklyStats = [
    { day: 'Mon', hours: 3, tasks: 5 },
    { day: 'Tue', hours: 4, tasks: 6 },
    { day: 'Wed', hours: 5, tasks: 8 },
    { day: 'Thu', hours: 3, tasks: 4 },
    { day: 'Fri', hours: 6, tasks: 9 },
    { day: 'Sat', hours: 7, tasks: 11 },
    { day: 'Sun', hours: 4, tasks: 6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold gradient-text">Analytics</h1>
        <p className="text-slate-400 mt-2">Deep insights into your study habits and performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Clock, label: 'Total Study Time', value: '156 hrs', color: 'text-blue-400' },
          { icon: Target, label: 'Tasks Completed', value: '142', color: 'text-green-400' },
          { icon: TrendingUp, label: 'Avg Daily', value: '3.5 hrs', color: 'text-purple-400' },
          { icon: Zap, label: 'Current Streak', value: '18 days', color: 'text-yellow-400' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-morphism rounded-2xl p-6 border border-slate-700/50"
            >
              <div className="flex items-center gap-4">
                <Icon size={24} className={stat.color} />
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity by Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-morphism rounded-3xl p-8 border border-slate-700/50"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">Productivity by Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Line type="monotone" dataKey="productivity" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Subject Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-morphism rounded-3xl p-8 border border-slate-700/50"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">Study Time by Subject</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}h`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Weekly Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-morphism rounded-3xl p-8 border border-slate-700/50"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Weekly Study Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Bar dataKey="hours" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="tasks" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
