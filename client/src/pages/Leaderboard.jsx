import { motion } from 'framer-motion';
import { Trophy, Medal, Zap } from 'lucide-react';

const Leaderboard = () => {
  const leaderboard = [
    { rank: 1, name: 'Utsav', xp: 1240, streak: 18, badge: '🌟' },
    { rank: 2, name: 'Aarav', xp: 980, streak: 12, badge: '🔥' },
    { rank: 3, name: 'Siya', xp: 910, streak: 15, badge: '⭐' },
    { rank: 4, name: 'Priya', xp: 850, streak: 10, badge: '💫' },
    { rank: 5, name: 'Rohit', xp: 720, streak: 8, badge: '' },
    { rank: 6, name: 'Neha', xp: 650, streak: 7, badge: '' },
    { rank: 7, name: 'Arjun', xp: 580, streak: 5, badge: '' },
    { rank: 8, name: 'Divya', xp: 520, streak: 4, badge: '' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold gradient-text">Leaderboard</h1>
        <p className="text-slate-400 mt-2">Compete with your peers and climb the ranks</p>
      </div>

      {/* Top 3 Podium */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-morphism rounded-2xl p-6 border border-slate-700/50 text-center"
        >
          <div className="text-6xl mb-3">🥈</div>
          <h3 className="text-2xl font-bold text-white mb-2">#{leaderboard[1].rank}</h3>
          <p className="text-xl font-bold gradient-text mb-4">{leaderboard[1].name}</p>
          <div className="space-y-2">
            <p className="text-yellow-400 font-bold text-lg">{leaderboard[1].xp} XP</p>
            <p className="text-slate-400 text-sm flex items-center justify-center gap-1">
              <Zap size={16} /> {leaderboard[1].streak} day streak
            </p>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0 }}
          className="glass-morphism rounded-2xl p-8 border-2 border-yellow-500/50 text-center relative ring-2 ring-yellow-500/20"
        >
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce">👑</div>
          <div className="text-7xl mb-3 mt-4">🥇</div>
          <h3 className="text-3xl font-bold gradient-text mb-2">#{leaderboard[0].rank}</h3>
          <p className="text-2xl font-bold text-yellow-400 mb-4">{leaderboard[0].name}</p>
          <div className="space-y-2">
            <p className="text-yellow-400 font-bold text-xl">{leaderboard[0].xp} XP</p>
            <p className="text-slate-300 text-sm flex items-center justify-center gap-1">
              <Zap size={16} /> {leaderboard[0].streak} day streak
            </p>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-morphism rounded-2xl p-6 border border-slate-700/50 text-center"
        >
          <div className="text-6xl mb-3">🥉</div>
          <h3 className="text-2xl font-bold text-white mb-2">#{leaderboard[2].rank}</h3>
          <p className="text-xl font-bold gradient-text mb-4">{leaderboard[2].name}</p>
          <div className="space-y-2">
            <p className="text-yellow-400 font-bold text-lg">{leaderboard[2].xp} XP</p>
            <p className="text-slate-400 text-sm flex items-center justify-center gap-1">
              <Zap size={16} /> {leaderboard[2].streak} day streak
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-morphism rounded-3xl p-8 border border-slate-700/50 overflow-x-auto"
      >
        <h2 className="text-2xl font-bold mb-6 gradient-text">Full Rankings</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-4 px-4 font-bold text-slate-300">Rank</th>
              <th className="text-left py-4 px-4 font-bold text-slate-300">Name</th>
              <th className="text-left py-4 px-4 font-bold text-slate-300">XP</th>
              <th className="text-left py-4 px-4 font-bold text-slate-300">Streak</th>
              <th className="text-left py-4 px-4 font-bold text-slate-300">Badge</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <motion.tr
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="text-lg font-bold gradient-text">#{player.rank}</span>
                </td>
                <td className="py-4 px-4 font-semibold text-white">{player.name}</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold">
                    {player.xp} XP
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Zap size={16} className="text-orange-400" />
                    {player.streak}
                  </span>
                </td>
                <td className="py-4 px-4 text-xl">{player.badge}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Leaderboard;
