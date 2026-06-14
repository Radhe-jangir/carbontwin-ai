import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import Navigation from '@/components/Navigation';
import Dashboard from '@/pages/Dashboard';
import Analytics from '@/pages/Analytics';
import Recommendations from '@/pages/Recommendations';
import Forecast from '@/pages/Forecast';
import SimulationLab from '@/pages/SimulationLab';
import Profile from '@/pages/Profile';
import './App.css';

function App() {
  const theme = useAppStore(state => state.theme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setIsLoading(false);
  }, [theme]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h1 className="text-2xl font-bold text-emerald-600">CarbonTwin AI</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Loading your sustainability dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/simulation" element={<SimulationLab />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;