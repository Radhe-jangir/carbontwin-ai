import { EngineeringFeatures, UserPersona } from '@/types';

/**
 * User Segmentation Engine: Automatic persona classification
 * Classifies users into sustainability tiers based on their profile
 */

export type PersonaTier = 
  | 'eco_beginner'
  | 'conscious_consumer'
  | 'green_commuter'
  | 'sustainability_enthusiast'
  | 'climate_champion';

interface PersonaDefinition {
  tier: PersonaTier;
  label: string;
  description: string;
  icon: string;
  minScore: number;
  maxScore: number;
  characteristics: string[];
}

const PERSONA_DEFINITIONS: PersonaDefinition[] = [
  {
    tier: 'eco_beginner',
    label: 'Eco Beginner',
    description: 'Just starting your sustainability journey',
    icon: '🌱',
    minScore: 0,
    maxScore: 20,
    characteristics: [
      'High carbon footprint',
      'New to sustainability',
      'Needs education and guidance',
      'Open to changes',
    ],
  },
  {
    tier: 'conscious_consumer',
    label: 'Conscious Consumer',
    description: 'Making eco-friendly shopping choices',
    icon: '🛍️',
    minScore: 21,
    maxScore: 40,
    characteristics: [
      'Moderate carbon footprint',
      'Aware of impact',
      'Making some changes',
      'Focused on consumption',
    ],
  },
  {
    tier: 'green_commuter',
    label: 'Green Commuter',
    description: 'Optimized transportation and energy',
    icon: '🚴',
    minScore: 41,
    maxScore: 60,
    characteristics: [
      'Low transportation emissions',
      'Efficient energy use',
      'Active lifestyle',
      'Good habits formed',
    ],
  },
  {
    tier: 'sustainability_enthusiast',
    label: 'Sustainability Enthusiast',
    description: 'Comprehensive eco-friendly lifestyle',
    icon: '🌿',
    minScore: 61,
    maxScore: 80,
    characteristics: [
      'Very low carbon footprint',
      'Multiple sustainable practices',
      'Influencing others',
      'Seeking optimization',
    ],
  },
  {
    tier: 'climate_champion',
    label: 'Climate Champion',
    description: 'Leading the sustainability movement',
    icon: '♻️',
    minScore: 81,
    maxScore: 100,
    characteristics: [
      'Minimal carbon footprint',
      'Carbon negative or neutral',
      'Inspiring others',
      'Continuous improvement',
      'Advocate for change',
    ],
  },
];

/**
 * Classify user into a persona tier
 */
export function classifyUserPersona(
  ecoScore: number,
  features: EngineeringFeatures
): UserPersona {
  const definition = PERSONA_DEFINITIONS.find(
    p => ecoScore >= p.minScore && ecoScore <= p.maxScore
  ) || PERSONA_DEFINITIONS[0];

  const percentile = calculatePercentile(ecoScore);
  const reasoning = generatePersonaReasoning(ecoScore, features, definition);

  return {
    tier: definition.tier,
    score: ecoScore,
    reasoning,
    percentile,
  };
}

/**
 * Calculate percentile rank among all users
 */
function calculatePercentile(ecoScore: number): number {
  // Simplified: assume normal distribution around 50
  // In production, would compare against actual user database
  const stdDev = 20;
  const mean = 50;
  const zScore = (ecoScore - mean) / stdDev;
  
  // Approximate percentile using normal distribution
  const percentile = Math.round(100 / (1 + Math.exp(-zScore)));
  return Math.min(100, Math.max(1, percentile));
}

/**
 * Generate human-readable reasoning for persona classification
 */
function generatePersonaReasoning(
  ecoScore: number,
  features: EngineeringFeatures,
  definition: PersonaDefinition
): string {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Identify strengths
  if (features.transportCo2Score > 70) strengths.push('efficient transportation');
  if (features.electricityCo2Score > 70) strengths.push('low energy consumption');
  if (features.foodCategory === 'vegan' || features.foodCategory === 'vegetarian') 
    strengths.push('sustainable diet');
  if (features.recyclingRate > 60) strengths.push('good waste management');

  // Identify weaknesses
  if (features.transportCo2Score < 40) weaknesses.push('high transportation emissions');
  if (features.electricityCo2Score < 40) weaknesses.push('high energy consumption');
  if (features.foodCategory === 'high-meat') weaknesses.push('meat-heavy diet');
  if (features.shoppingCo2Score < 40) weaknesses.push('high consumption');
  if (features.flightCo2Score > 50) weaknesses.push('frequent flying');

  let reasoning = `You are a ${definition.label}. `;
  
  if (strengths.length > 0) {
    reasoning += `Your strengths include ${strengths.slice(0, 2).join(', ')}. `;
  }
  
  if (weaknesses.length > 0) {
    reasoning += `Focus on reducing ${weaknesses.slice(0, 2).join(' and ')}.`;
  } else {
    reasoning += `Keep up your excellent sustainability practices!`;
  }

  return reasoning;
}

/**
 * Get persona details for display
 */
export function getPersonaDetails(tier: PersonaTier) {
  return PERSONA_DEFINITIONS.find(p => p.tier === tier);
}

/**
 * Calculate progression to next tier
 */
export function calculateNextTier(
  currentScore: number,
  currentTier: PersonaTier
): { nextTier: PersonaTier | null; pointsNeeded: number; percentComplete: number } {
  const currentDef = PERSONA_DEFINITIONS.find(p => p.tier === currentTier);
  const nextDef = PERSONA_DEFINITIONS[PERSONA_DEFINITIONS.indexOf(currentDef!) + 1];

  if (!nextDef) {
    return { nextTier: null, pointsNeeded: 0, percentComplete: 100 };
  }

  const pointsNeeded = nextDef.minScore - currentScore;
  const rangeSize = nextDef.minScore - currentDef!.minScore;
  const pointsEarned = currentScore - currentDef!.minScore;
  const percentComplete = (pointsEarned / rangeSize) * 100;

  return {
    nextTier: nextDef.tier,
    pointsNeeded: Math.max(0, pointsNeeded),
    percentComplete: Math.min(100, percentComplete),
  };
}
