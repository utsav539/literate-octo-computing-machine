import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { Mail, Lock, User } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { login, register } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.name) {
          toast.error('Name is required');
          setLoading(false);
          return;
        }
        result = await register(formData.name, formData.email, formData.password);
      }

      if (result.success) {
        toast.success(`${isLogin ? 'Logged in' : 'Registered'} successfully!`);
      } else {
        toast.error(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold gradient-text mb-2">📚 StudyHub</h1>
          <p className="text-slate-400">Master Your Studies with AI-Powered Insights</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-morphism rounded-2xl p-8 border border-slate-700/50"
        >
          <div className="flex gap-2 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Register
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-12"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-12"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-12"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-primary w-full font-semibold"
            >
              {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
            </motion.button>
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-400 text-sm mt-6"
        >
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Auth;
