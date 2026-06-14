import { Recommendation, EngineeringFeatures } from '@/types';

/**
 * Recommendation Engine: Personalized sustainability recommendations
 * Ranks and scores recommendations based on:
 * - Impact potential
 * - Cost-benefit
 * - Implementation difficulty
 * - User's current profile
 */

interface RecommendationTemplate {
  id: string;
  category: 'transport' | 'electricity' | 'food' | 'shopping' | 'waste' | 'travel';
  title: string;
  description: string;
  impact: {
    co2ReductionKg: number;
    costSavings: number;
    difficulty: 'easy' | 'moderate' | 'hard';
    timeframe: string;
  };
  implementation: {
    steps: string[];
    resources: string[];
    timelineWeeks: number;
  };
  triggers?: (features: EngineeringFeatures) => boolean;
}

const RECOMMENDATION_TEMPLATES: RecommendationTemplate[] = [
  {
    id: 'switch-ev',
    category: 'transport',
    title: 'Switch to Electric Vehicle',
    description: 'Reduce transportation emissions by 75% with an electric vehicle. Eligible for tax credits in many regions.',
    impact: {
      co2ReductionKg: 4800,
      costSavings: 2000,
      difficulty: 'hard',
      timeframe: '1 year',
    },
    implementation: {
      steps: [
        'Research EV models and incentives',
        'Test drive vehicles',
        'Evaluate charging infrastructure',
        'Purchase or lease',
        'Install home charger',
      ],
      resources: ['fueleconomy.gov', 'plugshare.com', 'local dealerships'],
      timelineWeeks: 26,
    },
    triggers: (f) => f.transportCo2Score < 30,
  },
  {
    id: 'public-transit',
    category: 'transport',
    title: 'Use Public Transportation',
    description: 'Switch to buses, trains, or rideshares for your daily commute. Reduces emissions by 60-80% compared to personal vehicles.',
    impact: {
      co2ReductionKg: 3000,
      costSavings: 1500,
      difficulty: 'moderate',
      timeframe: 'Immediate',
    },
    implementation: {
      steps: [
        'Check public transit routes near you',
        'Get a transit pass',
        'Plan commute schedule',
        'Make the switch',
      ],
      resources: ['google.com/maps', 'citytransit.org'],
      timelineWeeks: 2,
    },
    triggers: (f) => f.transportDistanceKm > 100,
  },
  {
    id: 'bike-commute',
    category: 'transport',
    title: 'Bike Commuting Program',
    description: 'Replace 3-4 car trips per week with cycling. Zero emissions and health benefits included.',
    impact: {
      co2ReductionKg: 1500,
      costSavings: 800,
      difficulty: 'moderate',
      timeframe: 'Ongoing',
    },
    implementation: {
      steps: [
        'Purchase or repair a bike',
        'Get safety equipment',
        'Plan bike-friendly routes',
        'Start with 1-2 trips per week',
      ],
      resources: ['local bike shops', 'biking apps'],
      timelineWeeks: 4,
    },
    triggers: (f) => f.transportDistanceKm > 50,
  },
  {
    id: 'renewable-energy',
    category: 'electricity',
    title: 'Switch to Renewable Energy',
    description: 'Choose a green energy plan from your utility provider. Reduce electricity-related emissions by 100%.',
    impact: {
      co2ReductionKg: 2400,
      costSavings: 100,
      difficulty: 'easy',
      timeframe: '1-3 months',
    },
    implementation: {
      steps: [
        'Contact your utility provider',
        'Compare renewable plans',
        'Switch to renewable plan',
      ],
      resources: ['your utility provider', 'energystar.gov'],
      timelineWeeks: 4,
    },
    triggers: (f) => f.electricityCo2Score < 50,
  },
  {
    id: 'solar-panels',
    category: 'electricity',
    title: 'Install Solar Panels',
    description: 'Generate your own clean energy. Long-term investment with significant returns.',
    impact: {
      co2ReductionKg: 3600,
      costSavings: 3000,
      difficulty: 'hard',
      timeframe: '1-2 years',
    },
    implementation: {
      steps: [
        'Get solar assessment',
        'Get quotes from installers',
        'Apply for incentives',
        'Installation',
        'Monitoring and maintenance',
      ],
      resources: ['solarreviews.com', 'energysage.com'],
      timelineWeeks: 26,
    },
    triggers: (f) => f.electricityConsumptionKwh > 800,
  },
  {
    id: 'reduce-meat',
    category: 'food',
    title: 'Try Meatless Mondays',
    description: 'Reduce meat consumption to one day per week. Simple way to lower food-related emissions.',
    impact: {
      co2ReductionKg: 900,
      costSavings: 200,
      difficulty: 'easy',
      timeframe: 'Ongoing',
    },
    implementation: {
      steps: [
        'Plan plant-based meals',
        'Try new recipes',
        'Meatless Monday commitment',
      ],
      resources: ['happycow.net', 'minimalistbaker.com'],
      timelineWeeks: 1,
    },
    triggers: (f) => f.meatConsumptionScore > 40,
  },
  {
    id: 'vegan-diet',
    category: 'food',
    title: 'Transition to Vegan Diet',
    description: 'Eliminate animal products. Highest impact dietary change possible.',
    impact: {
      co2ReductionKg: 2000,
      costSavings: 500,
      difficulty: 'hard',
      timeframe: '6-12 months',
    },
    implementation: {
      steps: [
        'Research vegan nutrition',
        'Find local vegan restaurants',
        'Stock plant-based foods',
        'Gradual transition',
      ],
      resources: ['veganhealth.org', 'earthfed.com'],
      timelineWeeks: 26,
    },
    triggers: (f) => f.meatConsumptionScore > 50,
  },
  {
    id: 'reduce-shopping',
    category: 'shopping',
    title: 'Sustainable Shopping Habits',
    description: 'Buy less, buy better, buy secondhand. Reduce consumption-related emissions.',
    impact: {
      co2ReductionKg: 500,
      costSavings: 1000,
      difficulty: 'moderate',
      timeframe: 'Ongoing',
    },
    implementation: {
      steps: [
        'Set a shopping budget',
        'Buy used items first',
        'Choose sustainable brands',
        'Practice minimalism',
      ],
      resources: ['thrift stores', 'depop.com', 'poshmark.com'],
      timelineWeeks: 4,
    },
    triggers: (f) => f.shoppingCo2Score > 50,
  },
  {
    id: 'offset-flights',
    category: 'travel',
    title: 'Carbon Offset for Flights',
    description: 'Offset flight emissions through certified carbon reduction projects.',
    impact: {
      co2ReductionKg: 1000,
      costSavings: -50,
      difficulty: 'easy',
      timeframe: 'Immediate',
    },
    implementation: {
      steps: [
        'Calculate flight emissions',
        'Choose offset provider',
        'Purchase offsets',
      ],
      resources: ['carbonfootprint.com', 'offset.climateneutrality.org'],
      timelineWeeks: 1,
    },
    triggers: (f) => f.flightCo2Score > 30,
  },
  {
    id: 'reduce-flights',
    category: 'travel',
    title: 'Reduce Flight Frequency',
    description: 'Consider virtual meetings and shorter trips. Flights are highest-impact travel.',
    impact: {
      co2ReductionKg: 1500,
      costSavings: 2000,
      difficulty: 'moderate',
      timeframe: 'Ongoing',
    },
    implementation: {
      steps: [
        'Plan trips strategically',
        'Use video conferencing',
        'Consider train/car alternatives',
        'Group trips together',
      ],
      resources: ['zoom.us', 'wanderu.com'],
      timelineWeeks: 8,
    },
    triggers: (f) => f.flightCo2Score > 40,
  },
  {
    id: 'improve-recycling',
    category: 'waste',
    title: 'Improve Recycling & Composting',
    description: 'Divert waste from landfill. Prevent methane emissions and recover materials.',
    impact: {
      co2ReductionKg: 400,
      costSavings: 50,
      difficulty: 'easy',
      timeframe: 'Immediate',
    },
    implementation: {
      steps: [
        'Set up recycling bins',
        'Learn local recycling rules',
        'Start composting',
        'Track waste reduction',
      ],
      resources: ['earth911.com', 'local waste management'],
      timelineWeeks: 2,
    },
    triggers: (f) => f.recyclingRate < 50,
  },
];

/**
 * Generate personalized recommendations
 */
export function generateRecommendations(
  features: EngineeringFeatures,
  userId: string,
  existingRecommendations: Recommendation[] = []
): Recommendation[] {
  const dismissed = new Set(existingRecommendations.filter(r => r.dismissed).map(r => r.id));

  return RECOMMENDATION_TEMPLATES
    .filter(t => !dismissed.has(t.id))
    .filter(t => !t.triggers || t.triggers(features))
    .map(t => createRecommendation(t, userId, features))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 10); // Return top 10
}

/**
 * Convert template to recommendation with scoring
 */
function createRecommendation(
  template: RecommendationTemplate,
  userId: string,
  features: EngineeringFeatures
): Recommendation {
  // Calculate impact score (0-100)
  const impactScore = Math.min(100, (template.impact.co2ReductionKg / 50) * 100);

  // Calculate cost-benefit score
  const costBenefit = template.impact.costSavings / (template.impact.costSavings || 1);
  const costScore = Math.min(100, costBenefit * 50);

  // Calculate difficulty score (inverted)
  const difficultyScores = { easy: 100, moderate: 66, hard: 33 };
  const diffScore = difficultyScores[template.impact.difficulty];

  // Calculate category relevance
  const relevanceScore = calculateRelevance(template, features);

  // Final priority score is weighted combination
  const priorityScore = (
    impactScore * 0.35 +
    costScore * 0.25 +
    diffScore * 0.25 +
    relevanceScore * 0.15
  );

  return {
    id: template.id,
    userId,
    category: template.category,
    title: template.title,
    description: template.description,
    impact: template.impact,
    actionScore: impactScore,
    priorityScore,
    implementation: template.implementation,
    createdAt: new Date(),
    dismissed: false,
  };
}

/**
 * Calculate how relevant a recommendation is to user's profile
 */
function calculateRelevance(
  template: RecommendationTemplate,
  features: EngineeringFeatures
): number {
  const categoryScores: Record<string, number> = {
    transport: features.transportCo2Score,
    electricity: features.electricityCo2Score,
    food: features.foodCarbonScore,
    shopping: features.shoppingCo2Score,
    waste: features.wasteGenerationScore,
    travel: features.flightCo2Score,
  };

  // Higher relevance for categories where user has highest impact
  return Math.max(0, 100 - (categoryScores[template.category] || 0));
}

/**
 * Calculate impact of a recommendation
 */
export function calculateRecommendationImpact(
  recommendation: Recommendation,
  features: EngineeringFeatures
): {
  co2Reduction: number;
  costSavings: number;
  newEcoScore: number;
  percentageReduction: number;
} {
  const currentEmissions = features.totalMonthlyEmissionsCo2;
  const co2Reduction = recommendation.impact.co2ReductionKg;
  const newEmissions = Math.max(0, currentEmissions - co2Reduction);
  const percentageReduction = (co2Reduction / currentEmissions) * 100;

  return {
    co2Reduction,
    costSavings: recommendation.impact.costSavings,
    newEcoScore: Math.min(100, features.sustainabilityIndex + (percentageReduction / 10)),
    percentageReduction,
  };
}
