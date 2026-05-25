import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: true,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/auth/me`);
        set({ user: response.data, token, loading: false });
      } catch (error) {
        localStorage.removeItem('token');
        set({ user: null, token: null, loading: false });
      }
    } else {
      set({ user: null, token: null, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null, token: null });
  },
}));

useAuthStore.getState().checkAuth();
