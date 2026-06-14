import { create } from 'zustand';
import { User, CarbonProfile, Forecast, Recommendation, AnalyticsData } from '@/types';

interface AppStore {
  user: User | null;
  setUser: (user: User | null) => void;

  carbonProfile: CarbonProfile | null;
  setCarbonProfile: (profile: CarbonProfile) => void;

  forecast: Forecast | null;
  setForecast: (forecast: Forecast) => void;

  recommendations: Recommendation[];
  setRecommendations: (recs: Recommendation[]) => void;
  dismissRecommendation: (id: string) => void;

  analyticsData: AnalyticsData | null;
  setAnalyticsData: (data: AnalyticsData) => void;

  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  carbonProfile: null,
  setCarbonProfile: (profile) => set({ carbonProfile: profile }),

  forecast: null,
  setForecast: (forecast) => set({ forecast }),

  recommendations: [],
  setRecommendations: (recs) => set({ recommendations: recs }),
  dismissRecommendation: (id) =>
    set((state) => ({
      recommendations: state.recommendations.map((r) =>
        r.id === id ? { ...r, dismissed: true } : r
      ),
    })),

  analyticsData: null,
  setAnalyticsData: (data) => set({ analyticsData: data }),

  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },

  loading: false,
  setLoading: (loading) => set({ loading }),

  error: null,
  setError: (error) => set({ error }),
}));
