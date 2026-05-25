import { create } from 'zustand';
import axios from 'axios';

const API_URL = '/api';

export const useAnalyticsStore = create((set) => ({
  stats: null,
  weeklyData: null,
  subjectProgress: null,
  suggestions: [],
  loading: false,

  fetchStats: async () => {
    set({ loading: true });
    try {
      const [statsRes, weeklyRes, subjectsRes, suggestionsRes] = await Promise.all([
        axios.get(`${API_URL}/analytics/user-stats`),
        axios.get(`${API_URL}/analytics/weekly-data`),
        axios.get(`${API_URL}/analytics/subject-progress`),
        axios.get(`${API_URL}/ai-suggestions/suggestions`),
      ]);
      set({
        stats: statsRes.data,
        weeklyData: weeklyRes.data,
        subjectProgress: subjectsRes.data,
        suggestions: suggestionsRes.data.suggestions,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      set({ loading: false });
    }
  },

  logStudySession: async (sessionData) => {
    try {
      const response = await axios.post(`${API_URL}/analytics/session`, sessionData);
      return response.data.session;
    } catch (error) {
      console.error('Failed to log session:', error);
      throw error;
    }
  },
}));
