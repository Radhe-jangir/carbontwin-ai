import { SimulationScenario, SimulationResults, EngineeringFeatures } from '@/types';

/**
 * What-If Simulation Lab: Model future sustainability scenarios
 * Allows users to simulate lifestyle changes and see impact
 */

export interface SimulationAction {
  id: string;
  category: 'transport' | 'electricity' | 'food' | 'shopping' | 'waste' | 'travel';
  name: string;
  description: string;
  emissionReduction: number; // percentage (0-100)
  costSavings: number; // annual savings
  implementation: {
    cost: number; // upfront cost
    timelineMonths: number;
  };
}

const SIMULATION_ACTIONS: SimulationAction[] = [
  {
    id: 'switch-ev',
    category: 'transport',
    name: 'Switch to Electric Vehicle',
    description: 'Replace gasoline car with EV',
    emissionReduction: 85,
    costSavings: 2000,
    implementation: { cost: 30000, timelineMonths: 3 },
  },
  {
    id: 'public-transit',
    category: 'transport',
    name: 'Use Public Transport 50%',
    description: 'Replace half car trips with transit',
    emissionReduction: 45,
    costSavings: 1200,
    implementation: { cost: 0, timelineMonths: 1 },
  },
  {
    id: 'bike-commute',
    category: 'transport',
    name: 'Bike Commuting',
    description: 'Replace 3 car trips/week with bike',
    emissionReduction: 30,
    costSavings: 600,
    implementation: { cost: 500, timelineMonths: 1 },
  },
  {
    id: 'renewable-energy',
    category: 'electricity',
    name: 'Switch to 100% Renewable',
    description: 'Change to green energy plan',
    emissionReduction: 100,
    costSavings: 50,
    implementation: { cost: 0, timelineMonths: 1 },
  },
  {
    id: 'solar-panels',
    category: 'electricity',
    name: 'Install Solar Panels',
    description: 'Generate solar electricity',
    emissionReduction: 75,
    costSavings: 1500,
    implementation: { cost: 15000, timelineMonths: 6 },
  },
  {
    id: 'energy-efficiency',
    category: 'electricity',
    name: 'Energy Efficiency Upgrades',
    description: 'Insulation, LED, efficient appliances',
    emissionReduction: 25,
    costSavings: 300,
    implementation: { cost: 5000, timelineMonths: 3 },
  },
  {
    id: 'meatless-mondays',
    category: 'food',
    name: 'Meatless Mondays',
    description: 'Skip meat one day per week',
    emissionReduction: 15,
    costSavings: 100,
    implementation: { cost: 0, timelineMonths: 0 },
  },
  {
    id: 'vegetarian-diet',
    category: 'food',
    name: 'Go Vegetarian',
    description: 'Eliminate meat consumption',
    emissionReduction: 50,
    costSavings: 300,
    implementation: { cost: 0, timelineMonths: 8 },
  },
  {
    id: 'vegan-diet',
    category: 'food',
    name: 'Go Vegan',
    description: 'Eliminate all animal products',
    emissionReduction: 75,
    costSavings: 500,
    implementation: { cost: 0, timelineMonths: 12 },
  },
  {
    id: 'reduce-shopping',
    category: 'shopping',
    name: 'Reduce Shopping 50%',
    description: 'Buy less, buy secondhand',
    emissionReduction: 50,
    costSavings: 2000,
    implementation: { cost: 0, timelineMonths: 2 },
  },
  {
    id: 'offset-flights',
    category: 'travel',
    name: 'Carbon Offset Flights',
    description: 'Offset all flight emissions',
    emissionReduction: 100,
    costSavings: 0,
    implementation: { cost: 200, timelineMonths: 0 },
  },
  {
    id: 'reduce-flights',
    category: 'travel',
    name: 'Reduce Flying 50%',
    description: 'Cut flight frequency in half',
    emissionReduction: 50,
    costSavings: 1500,
    implementation: { cost: 0, timelineMonths: 1 },
  },
];

/**
 * Run a what-if simulation
 */
export function runSimulation(
  baselineEmissions: number,
  selectedActions: string[]
): SimulationResults {
  const actions = selectedActions
    .map(id => SIMULATION_ACTIONS.find(a => a.id === id))
    .filter(Boolean) as SimulationAction[];

  if (actions.length === 0) {
    return {
      baselineEmissions,
      projectedEmissions: baselineEmissions,
      co2Reduction: 0,
      reductionPercentage: 0,
      costSavings: 0,
      paybackPeriod: undefined,
      impactSummary: 'Select actions to see projected impact.',
    };
  }

  // Calculate combined emission reduction
  // Simple model: reductions are applied independently, capped at 100%
  let totalReductionPercent = 0;
  for (const action of actions) {
    const remainingCapacity = 100 - totalReductionPercent;
    totalReductionPercent += (action.emissionReduction * remainingCapacity) / 100;
  }

  const co2Reduction = (baselineEmissions * totalReductionPercent) / 100;
  const projectedEmissions = baselineEmissions - co2Reduction;

  // Calculate financial impact
  const annualSavings = actions.reduce((sum, a) => sum + a.costSavings, 0);
  const totalUpfrontCost = actions.reduce((sum, a) => sum + a.implementation.cost, 0);
  const paybackPeriod = totalUpfrontCost > 0 ? totalUpfrontCost / annualSavings : undefined;

  // Generate impact summary
  const impactSummary = generateSimulationSummary(
    baselineEmissions,
    projectedEmissions,
    totalReductionPercent,
    annualSavings
  );

  return {
    baselineEmissions,
    projectedEmissions: Math.max(0, projectedEmissions),
    co2Reduction,
    reductionPercentage: totalReductionPercent,
    costSavings: annualSavings - totalUpfrontCost,
    paybackPeriod,
    impactSummary,
  };
}

/**
 * Generate human-readable simulation summary
 */
function generateSimulationSummary(
  baseline: number,
  projected: number,
  reductionPercent: number,
  annualSavings: number
): string {
  const reduction = baseline - projected;
  const yearsToOffset = reduction > 0 ? 1000 / (reduction * 12) : 0; // Trees needed

  return `By implementing these changes, you could reduce your annual emissions by ${reduction.toFixed(0)} kg CO₂ (${reductionPercent.toFixed(1)}%). This is equivalent to planting ${(yearsToOffset * 12).toFixed(0)} trees. Annual savings: $${annualSavings.toFixed(0)}.`;
}

/**
 * Get all available simulation actions
 */
export function getSimulationActions() {
  return SIMULATION_ACTIONS;
}

/**
 * Get actions by category
 */
export function getActionsByCategory(
  category: 'transport' | 'electricity' | 'food' | 'shopping' | 'waste' | 'travel'
) {
  return SIMULATION_ACTIONS.filter(a => a.category === category);
}

/**
 * Get impact metrics for an action
 */
export function getActionMetrics(actionId: string, baselineEmissions: number) {
  const action = SIMULATION_ACTIONS.find(a => a.id === actionId);
  if (!action) return null;

  const co2Reduction = (baselineEmissions * action.emissionReduction) / 100;
  const paybackMonths = action.implementation.cost > 0 
    ? (action.implementation.cost / (action.costSavings / 12))
    : 0;

  return {
    ...action,
    co2Reduction,
    paybackMonths,
  };
}
