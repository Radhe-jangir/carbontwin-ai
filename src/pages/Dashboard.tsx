import { useState, useEffect } from 'react';
import { TrendingDown, Leaf, Target, Zap } from 'lucide-react';
import EcoScoreCard from '@/components/EcoScoreCard';
import EmissionsByCategory from '@/components/EmissionsByCategory';
import QuickStats from '@/components/QuickStats';

function Dashboard() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load dashboard data
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome to Your Sustainability Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track your carbon footprint, get personalized recommendations, and make a difference.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <QuickStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Eco Score */}
        <div className="lg:col-span-1">
          <EcoScoreCard />
        </div>

        {/* Emissions by Category */}
        <div className="lg:col-span-2">
          <EmissionsByCategory />
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to make an impact?</h2>
            <p className="opacity-90">Explore personalized recommendations tailored to your lifestyle.</p>
          </div>
          <button className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
            View Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;