import { useState } from 'react';
import RecommendationCard from '@/components/RecommendationCard';
import { Lightbulb } from 'lucide-react';

function Recommendations() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'transport', label: 'Transportation' },
    { id: 'electricity', label: 'Electricity' },
    { id: 'food', label: 'Food' },
    { id: 'shopping', label: 'Shopping' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Lightbulb size={32} className="text-emerald-600" />
          Personalized Recommendations
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Discover actionable steps to reduce your carbon footprint.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id === 'all' ? null : cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              (selectedCategory === null && cat.id === 'all') || selectedCategory === cat.id
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecommendationCard />
        <RecommendationCard />
        <RecommendationCard />
        <RecommendationCard />
      </div>
    </div>
  );
}

export default Recommendations;