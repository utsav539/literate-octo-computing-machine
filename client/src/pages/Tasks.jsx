import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';
import { Plus, Trash2, CheckCircle2, Circle, Filter } from 'lucide-react';
import TaskModal from '../components/TaskModal';
import toast from 'react-hot-toast';

const Tasks = () => {
  const { tasks, fetchTasks, updateTask, deleteTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks?.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterSubject !== 'all' && task.subject !== filterSubject) return false;
    return true;
  }) || [];

  const handleToggleTask = async (task) => {
    try {
      await updateTask(task._id, {
        status: task.status === 'completed' ? 'pending' : 'completed'
      });
      toast.success('Task updated!');
      await fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      toast.success('Task deleted!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const subjects = ['All', ...new Set(tasks?.map(t => t.subject) || [])];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Tasks</h1>
          <p className="text-slate-400 mt-2">Manage your study tasks and track progress</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Task
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field w-40"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="input-field w-40"
        >
          {subjects.map(subject => (
            <option key={subject} value={subject === 'All' ? 'all' : subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-morphism rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-colors card-hover"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleToggleTask(task)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 size={24} className="text-green-400" />
                  ) : (
                    <Circle size={24} className="text-slate-500 hover:text-blue-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-lg font-semibold ${
                      task.status === 'completed' ? 'line-through text-slate-500' : 'text-white'
                    }`}>
                      {task.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-slate-400 text-sm mb-3">{task.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 items-center text-sm">
                    <span className="bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                      {task.subject}
                    </span>
                    <span className="text-slate-400">
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <span className="text-slate-400">
                      ⏱️ {task.estimatedTime} min
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="flex-shrink-0 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={20} className="text-red-400" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-slate-400 text-lg">No tasks found. Create one to get started!</p>
          </motion.div>
        )}
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskAdded={fetchTasks} />
    </motion.div>
  );
};

export default Tasks;
