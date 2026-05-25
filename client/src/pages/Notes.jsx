import { motion } from 'framer-motion';
import { FileText, Plus, Trash2, Star } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Notes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Photosynthesis Notes', subject: 'Biology', category: 'class-notes', isPinned: true },
    { id: 2, title: 'Quadratic Equations', subject: 'Mathematics', category: 'formula-sheet', isPinned: false },
    { id: 3, title: 'Thermodynamics Summary', subject: 'Physics', category: 'summary', isPinned: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePin = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
    toast.success('Note pinned!');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success('Note deleted!');
  };

  const pinnedNotes = notes.filter(n => n.isPinned);
  const regularNotes = notes.filter(n => !n.isPinned);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Notes</h1>
          <p className="text-slate-400 mt-2">Organize and manage your study notes</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Note
        </motion.button>
      </div>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <Star size={20} />
            Pinned Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-morphism rounded-xl p-6 border-2 border-yellow-500/30 card-hover relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className="text-blue-400" size={24} />
                  <button
                    onClick={() => togglePin(note.id)}
                    className="p-2 hover:bg-yellow-500/20 rounded-lg transition-colors"
                  >
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  </button>
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{note.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{note.subject}</p>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                  {note.category}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-4 right-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Notes */}
      <div>
        <h2 className="text-lg font-bold text-slate-300 mb-4">All Notes</h2>
        {regularNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-morphism rounded-xl p-6 border border-slate-700/50 card-hover group relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className="text-blue-400" size={24} />
                  <button
                    onClick={() => togglePin(note.id)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Star size={18} className="text-slate-400" />
                  </button>
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{note.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{note.subject}</p>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                  {note.category}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-4 right-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 text-lg">No notes yet. Create one to get started!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Notes;
