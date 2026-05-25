import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(1500); // 25 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(seconds => seconds - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,UklGRigEAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIEAAAAAAA=');
      audio.play().catch(() => {});
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-morphism rounded-3xl p-8 border border-slate-700/50 text-center"
    >
      <h2 className="text-2xl font-bold mb-6 gradient-text">🍅 Pomodoro Timer</h2>
      <div className="text-6xl font-bold text-red-400 mb-8 font-mono tracking-wider">
        {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
      <div className="flex gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTimer}
          className="btn-primary flex items-center gap-2"
        >
          {isActive ? <Pause size={20} /> : <Play size={20} />}
          {isActive ? 'Pause' : 'Start'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTimer}
          className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PomodoroTimer;
