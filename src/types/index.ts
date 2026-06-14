// User and Authentication Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  currency: string;
  country: string;
  energyUnit: 'kWh' | 'MWh';
  distanceUnit: 'km' | 'miles';
}

// Carbon Profile and Feature Store
export interface CarbonProfile {
  userId: string;
  month: string; // YYYY-MM
  features: EngineeringFeatures;
  rawInputs: RawInputs;
  ecoScore: number; // 0-100
  persona: UserPersona;
  lastUpdated: Date;
}

export interface RawInputs {
  transportDistanceMiles: number;
  electricityKwh: number;
  foodServingsPerWeek: {
    meatBased: number;
    dairy: number;
    plantBased: number;
    vegan: number;
  };
  shoppingSpend: number;
  wasteKg: number;
  travelFlightHours: number;
}

export interface EngineeringFeatures {
  // Transport Features
  transportDistanceKm: number;
  transportEmissionFactorAvg: number;
  transportCo2Score: number;
  transportCategory: 'minimal' | 'low' | 'moderate' | 'high';

  // Electricity Features
  electricityConsumptionKwh: number;
  electricityEmissionFactor: number;
  electricityCo2Score: number;
  electricityCategory: 'minimal' | 'low' | 'moderate' | 'high';

  // Food Features
  foodCarbonScore: number;
  meatConsumptionScore: number;
  foodCategory: 'vegan' | 'vegetarian' | 'pescatarian' | 'balanced' | 'high-meat';
  proteinsFromPlants: number;

  // Shopping Features
  shoppingCo2Score: number;
  shoppingCategory: 'minimal' | 'moderate' | 'high';
  itemsPerMonth: number;

  // Waste Features
  wasteGenerationScore: number;
  recyclingRate: number;
  wasteCategory: 'minimal' | 'low' | 'moderate' | 'high';

  // Travel Features
  flightEmissionsPerHour: number;
  flightCo2Score: number;

  // Composite Features
  lifestyleIntensity: number; // 0-1
  sustainabilityIndex: number; // 0-100
  totalMonthlyEmissionsCo2: number;
}

export interface UserPersona {
  tier: 'eco_beginner' | 'conscious_consumer' | 'green_commuter' | 'sustainability_enthusiast' | 'climate_champion';
  score: number;
  reasoning: string;
  percentile: number;
}

// Forecasting and Analytics
export interface Forecast {
  userId: string;
  generatedAt: Date;
  predictions: {
    nextMonth: ForecastPrediction;
    nextQuarter: ForecastPrediction;
    nextYear: ForecastPrediction;
  };
  methods: {
    movingAverage: number;
    exponentialSmoothing: number;
    linearTrend: number;
  };
}

export interface ForecastPrediction {
  predictedEmissions: number;
  confidence: number; // 0-100
  trend: 'increasing' | 'stable' | 'decreasing';
  changePercentage: number;
  explanation: string;
}

// Recommendations
export interface Recommendation {
  id: string;
  userId: string;
  category: 'transport' | 'electricity' | 'food' | 'shopping' | 'waste' | 'travel';
  title: string;
  description: string;
  impact: {
    co2ReductionKg: number;
    costSavings: number;
    difficulty: 'easy' | 'moderate' | 'hard';
    timeframe: string;
  };
  actionScore: number; // 0-100
  priorityScore: number; // 0-100
  implementation: {
    steps: string[];
    resources: string[];
    timelineWeeks: number;
  };
  createdAt: Date;
  dismissed: boolean;
}

// Analytics and Insights
export interface AnalyticsData {
  userId: string;
  period: string; // YYYY-MM
  metrics: {
    totalEmissions: number;
    emissionsByCategory: Record<string, number>;
    ecoScore: number;
    percentileRank: number;
    monthOverMonthChange: number;
    contributionAnalysis: ContributionAnalysis;
  };
  trends: TrendData[];
  benchmarks: BenchmarkData;
}

export interface ContributionAnalysis {
  transportation: number; // percentage
  electricity: number;
  food: number;
  shopping: number;
  waste: number;
  travel: number;
}

export interface TrendData {
  date: string;
  emissions: number;
  category?: string;
}

export interface BenchmarkData {
  userEmissions: number;
  countryAverage: number;
  globalAverage: number;
  userPercentile: number;
}

// Model Monitoring
export interface ModelMetrics {
  forecastConfidence: number;
  predictionStability: number;
  dataQualityScore: number;
  dataCompletenessPercentage: number;
  featureCoverage: number;
  recommendationReliability: number;
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdated: Date;
}

// What-If Simulation
export interface SimulationScenario {
  id: string;
  userId: string;
  name: string;
  changes: SimulationChange[];
  results: SimulationResults;
  createdAt: Date;
}

export interface SimulationChange {
  category: string;
  action: string;
  impact: number; // CO2 reduction percentage
  costSavings?: number;
}

export interface SimulationResults {
  baselineEmissions: number;
  projectedEmissions: number;
  co2Reduction: number;
  reductionPercentage: number;
  costSavings: number;
  paybackPeriod?: number;
  impactSummary: string;
}

// Impact Report
export interface ImpactReport {
  userId: string;
  period: string;
  ecoScore: number;
  carbonForecast: number;
  topInsight: string;
  persona: UserPersona;
  annualReductionPotential: number;
  generatedAt: Date;
}

// Achievement and Gamification
export interface Achievement {
  id: string;
  userId: string;
  type: 'milestone' | 'challenge' | 'streak';
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  progress: number;
}
