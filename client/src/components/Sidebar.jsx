import { motion } from 'framer-motion';
import { BarChart3, CheckSquare, BookOpen, FileText, Trophy, Brain, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/notes', icon: FileText, label: 'Notes' },
    { path: '/exams', icon: Calendar, label: 'Exams' },
    { path: '/analytics', icon: Brain, label: 'Analytics' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700/50 p-6 overflow-y-auto hidden md:block"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">📚 StudyHub</h1>
        <p className="text-slate-400 text-sm mt-2">Master Your Studies</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path}>
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            </Link>
          );
        })}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg"
      >
        <p className="text-sm text-slate-300 font-semibold mb-2">Pro Tip</p>
        <p className="text-xs text-slate-400">Maintain your daily streak for better focus and consistency!</p>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
