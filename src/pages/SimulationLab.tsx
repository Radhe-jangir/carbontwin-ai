import { Zap } from 'lucide-react';
import SimulationBuilder from '@/components/SimulationBuilder';

function SimulationLab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Zap size={32} className="text-emerald-600" />
          What-If Simulation Lab
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Model lifestyle changes and see their impact on your carbon footprint.
        </p>
      </div>

      <SimulationBuilder />
    </div>
  );
}

export default SimulationLab;