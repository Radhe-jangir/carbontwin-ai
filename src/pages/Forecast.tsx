import { TrendingUp } from 'lucide-react';
import ForecastChart from '@/components/ForecastChart';

function Forecast() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <TrendingUp size={32} className="text-emerald-600" />
          Carbon Emission Forecast
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          AI-powered predictions for your future emissions based on your current trends.
        </p>
      </div>

      <div className="card p-6">
        <ForecastChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Next Month', 'Next Quarter', 'Next Year'].map((period, i) => (
          <div key={i} className="card p-6">
            <h3 className="font-semibold text-lg mb-4">{period}</h3>
            <div className="text-3xl font-bold text-emerald-600 mb-2">250 kg CO₂</div>
            <p className="text-sm text-slate-600 dark:text-slate-400">+5% vs current</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;