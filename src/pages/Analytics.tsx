import { useState } from 'react';
import AnalyticsOverview from '@/components/AnalyticsOverview';
import TrendChart from '@/components/TrendChart';

function Analytics() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Deep insights into your carbon emissions and sustainability metrics.
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {(['month', 'quarter', 'year'] as const).map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              period === p
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Analytics Components */}
      <AnalyticsOverview period={period} />
      <TrendChart period={period} />
    </div>
  );
}

export default Analytics;