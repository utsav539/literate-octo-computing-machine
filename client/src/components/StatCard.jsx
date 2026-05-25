import { motion } from 'framer-motion';
import { Flame, Clock, Zap, AlertCircle } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, trend }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`glass-morphism rounded-2xl p-6 border border-slate-700/50 card-hover`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className={`text-4xl font-bold mt-2 ${color}`}>{value}</p>
          {trend && <p className="text-xs text-green-400 mt-2 flex items-center gap-1">↑ {trend}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text', 'bg')}/20`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
