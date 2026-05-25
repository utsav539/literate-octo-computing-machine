import { motion } from 'framer-motion';
import { Menu, Bell, LogOut, User, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold gradient-text">StudyHub</h2>
        </div>

        <div className="flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <img
                src={user?.avatar}
                alt="User"
                className="w-8 h-8 rounded-full border border-blue-500"
              />
              <span className="text-sm font-medium">{user?.name}</span>
            </motion.button>

            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50"
              >
                <button className="w-full px-4 py-2 text-left hover:bg-slate-700/50 flex items-center gap-2 rounded-t-lg">
                  <User size={16} /> Profile
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-slate-700/50 flex items-center gap-2">
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-red-500/20 flex items-center gap-2 text-red-400 rounded-b-lg border-t border-slate-700"
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
