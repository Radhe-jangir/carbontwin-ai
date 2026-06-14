import { CarbonProfile, EngineeringFeatures, RawInputs, ContributionAnalysis } from '@/types';

/**
 * Analytics Engine: Transforms raw inputs into engineered features
 * This is the core ML feature engineering layer
 */

const EMISSION_FACTORS = {
  // Transport (CO2 per km)
  car: 0.192,
  bus: 0.089,
  train: 0.041,
  bicycle: 0,
  walking: 0,

  // Electricity (CO2 per kWh) - varies by country
  electricity: 0.385, // Average US grid

  // Food (CO2 per serving)
  meatBased: 6.61,
  dairy: 1.23,
  plantBased: 0.51,
  vegan: 0.51,

  // Shopping (CO2 per USD spent)
  shopping: 0.25,

  // Waste (CO2 per kg)
  waste: 2.5,

  // Flight (CO2 per hour)
  flight: 90,
};

/**
 * Engineer features from raw inputs
 */
export function engineerFeatures(inputs: RawInputs): EngineeringFeatures {
  // Transport Features
  const transportDistanceKm = inputs.transportDistanceMiles * 1.60934;
  const transportEmissionFactorAvg = EMISSION_FACTORS.car; // Simplified: assume car
  const transportCo2Score = calculateCo2Score(
    transportDistanceKm * transportEmissionFactorAvg,
    100
  );

  // Electricity Features
  const electricityEmissionFactor = EMISSION_FACTORS.electricity;
  const electricityCo2Score = calculateCo2Score(
    inputs.electricityKwh * electricityEmissionFactor,
    50
  );

  // Food Features
  const meatServings = inputs.foodServingsPerWeek.meatBased;
  const dairyServings = inputs.foodServingsPerWeek.dairy;
  const plantServings = inputs.foodServingsPerWeek.plantBased + inputs.foodServingsPerWeek.vegan;

  const foodCo2 = (meatServings * EMISSION_FACTORS.meatBased +
    dairyServings * EMISSION_FACTORS.dairy +
    plantServings * EMISSION_FACTORS.plantBased) * 4; // 4 weeks

  const meatConsumptionScore = (meatServings / (meatServings + dairyServings + plantServings)) * 100;
  const proteinsFromPlants = (plantServings / (meatServings + dairyServings + plantServings)) * 100 || 0;

  // Shopping Features
  const shoppingCo2 = inputs.shoppingSpend * EMISSION_FACTORS.shopping;
  const shoppingCo2Score = calculateCo2Score(shoppingCo2, 30);

  // Waste Features
  const wasteCo2 = inputs.wasteKg * EMISSION_FACTORS.waste;
  const wasteGenerationScore = calculateCo2Score(wasteCo2, 20);
  const recyclingRate = Math.min(inputs.wasteKg > 0 ? (inputs.wasteKg * 0.4) / inputs.wasteKg * 100 : 0, 100);

  // Travel Features
  const flightCo2 = inputs.travelFlightHours * EMISSION_FACTORS.flight;
  const flightCo2Score = calculateCo2Score(flightCo2, 100);

  // Total Monthly Emissions
  const totalEmissions = (
    transportDistanceKm * transportEmissionFactorAvg +
    inputs.electricityKwh * electricityEmissionFactor +
    foodCo2 +
    shoppingCo2 +
    wasteCo2 +
    flightCo2
  );

  // Composite Features
  const lifestyleIntensity = Math.min(totalEmissions / 500, 1); // Normalize
  const sustainabilityIndex = Math.max(0, 100 - (lifestyleIntensity * 100));

  return {
    transportDistanceKm,
    transportEmissionFactorAvg,
    transportCo2Score,
    transportCategory: categorizeCo2(transportCo2Score),

    electricityConsumptionKwh: inputs.electricityKwh,
    electricityEmissionFactor,
    electricityCo2Score,
    electricityCategory: categorizeCo2(electricityCo2Score),

    foodCarbonScore: calculateCo2Score(foodCo2, 100),
    meatConsumptionScore,
    foodCategory: categorizeFoodCategory(meatConsumptionScore, proteinsFromPlants),
    proteinsFromPlants,

    shoppingCo2Score,
    shoppingCategory: categorizeCo2(shoppingCo2Score),
    itemsPerMonth: inputs.shoppingSpend / 50, // Assume avg $50 per item

    wasteGenerationScore,
    recyclingRate,
    wasteCategory: categorizeCo2(wasteGenerationScore),

    flightEmissionsPerHour: EMISSION_FACTORS.flight,
    flightCo2Score,

    lifestyleIntensity,
    sustainabilityIndex,
    totalMonthlyEmissionsCo2: totalEmissions,
  };
}

/**
 * Calculate eco score from emissions
 */
function calculateCo2Score(emissions: number, threshold: number): number {
  if (emissions === 0) return 100;
  return Math.max(0, 100 - (emissions / threshold) * 100);
}

/**
 * Categorize CO2 score
 */
function categorizeCo2(score: number): 'minimal' | 'low' | 'moderate' | 'high' {
  if (score >= 80) return 'minimal';
  if (score >= 60) return 'low';
  if (score >= 40) return 'moderate';
  return 'high';
}

/**
 * Categorize food consumption pattern
 */
function categorizeFoodCategory(
  meatScore: number,
  plantsPercent: number
): 'vegan' | 'vegetarian' | 'pescatarian' | 'balanced' | 'high-meat' {
  if (plantsPercent === 100) return 'vegan';
  if (plantsPercent >= 90) return 'vegetarian';
  if (plantsPercent >= 70) return 'pescatarian';
  if (meatScore >= 70) return 'high-meat';
  return 'balanced';
}

/**
 * Calculate contribution analysis
 */
export function calculateContributionAnalysis(features: EngineeringFeatures): ContributionAnalysis {
  const transportation = (features.transportDistanceKm * features.transportEmissionFactorAvg) / features.totalMonthlyEmissionsCo2 * 100;
  const electricity = (features.electricityConsumptionKwh * features.electricityEmissionFactor) / features.totalMonthlyEmissionsCo2 * 100;
  const food = (features.foodCarbonScore * 50) / features.totalMonthlyEmissionsCo2 * 100; // Rough estimate
  const shopping = (features.shoppingCo2Score * 30) / features.totalMonthlyEmissionsCo2 * 100;
  const waste = (features.wasteGenerationScore * 20) / features.totalMonthlyEmissionsCo2 * 100;
  const travel = (features.flightCo2Score * 100) / features.totalMonthlyEmissionsCo2 * 100;

  return {
    transportation: Math.max(0, Math.min(100, transportation)),
    electricity: Math.max(0, Math.min(100, electricity)),
    food: Math.max(0, Math.min(100, food)),
    shopping: Math.max(0, Math.min(100, shopping)),
    waste: Math.max(0, Math.min(100, waste)),
    travel: Math.max(0, Math.min(100, travel)),
  };
}

/**
 * Calculate overall eco score (0-100)
 */
export function calculateEcoScore(features: EngineeringFeatures): number {
  const weights = {
    transport: 0.3,
    electricity: 0.25,
    food: 0.2,
    shopping: 0.1,
    waste: 0.1,
    travel: 0.05,
  };

  const weightedScore = (
    (features.transportCo2Score * weights.transport) +
    (features.electricityCo2Score * weights.electricity) +
    (calculateCo2Score(features.foodCarbonScore * 50, 100) * weights.food) +
    (features.shoppingCo2Score * weights.shopping) +
    (features.wasteGenerationScore * weights.waste) +
    (features.flightCo2Score * weights.travel)
  );

  return Math.round(weightedScore);
}
