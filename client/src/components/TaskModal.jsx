import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTaskStore } from '../store/taskStore';

const TaskModal = ({ isOpen, onClose, onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Other',
    priority: 'medium',
    dueDate: '',
    estimatedTime: 60,
  });
  const { addTask } = useTaskStore();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTask(formData);
      toast.success('Task created successfully!');
      setFormData({
        title: '',
        description: '',
        subject: 'Other',
        priority: 'medium',
        dueDate: '',
        estimatedTime: 60,
      });
      onTaskAdded?.();
      onClose();
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold gradient-text">Add New Task</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            required
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="input-field resize-none"
            rows="3"
          />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="input-field"
          >
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Mathematics</option>
            <option>Biology</option>
            <option>English</option>
            <option>History</option>
            <option>Geography</option>
            <option>Other</option>
          </select>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="estimatedTime"
            placeholder="Estimated time (minutes)"
            value={formData.estimatedTime}
            onChange={handleChange}
            className="input-field"
            min="15"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            {loading ? 'Creating...' : 'Create Task'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TaskModal;
