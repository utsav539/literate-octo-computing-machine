import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async (filters = {}) => {
    set({ loading: true });
    try {
      const params = new URLSearchParams(filters);
      const response = await axios.get(`${API_URL}/tasks?${params}`);
      set({ tasks: response.data, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      set({ tasks: [...get().tasks, response.data.task] });
      return response.data.task;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
      set({
        tasks: get().tasks.map(task => task._id === id ? response.data.task : task)
      });
      return response.data.task;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      set({ tasks: get().tasks.filter(task => task._id !== id) });
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));
