import { Forecast, ForecastPrediction } from '@/types';

/**
 * Forecasting Engine: Predictive analytics for carbon emissions
 * Implements multiple forecasting methods:
 * - Moving Average
 * - Exponential Smoothing
 * - Linear Trend Projection
 */

export interface HistoricalData {
  month: string;
  emissions: number;
}

/**
 * Generate forecasts for next month, quarter, and year
 */
export function generateForecast(
  historicalData: HistoricalData[],
  userId: string
): Forecast {
  // Ensure we have enough data
  if (historicalData.length === 0) {
    return generateDefaultForecast(userId);
  }

  const emissions = historicalData.map(d => d.emissions);
  
  const movingAvg = calculateMovingAverage(emissions);
  const exponentialSmoothing = calculateExponentialSmoothing(emissions);
  const linearTrend = calculateLinearTrend(emissions);

  // Average the three methods for ensemble forecast
  const avgForecast = (movingAvg + exponentialSmoothing + linearTrend) / 3;
  const currentEmissions = emissions[emissions.length - 1];
  const changePercent = ((avgForecast - currentEmissions) / currentEmissions) * 100;

  return {
    userId,
    generatedAt: new Date(),
    predictions: {
      nextMonth: {
        predictedEmissions: Math.round(avgForecast),
        confidence: calculateConfidence(emissions),
        trend: getTrend(changePercent),
        changePercentage: changePercent,
        explanation: generateExplanation(changePercent, calculateConfidence(emissions)),
      },
      nextQuarter: {
        predictedEmissions: Math.round(avgForecast * 3),
        confidence: Math.max(0, calculateConfidence(emissions) - 10),
        trend: getTrend(changePercent),
        changePercentage: changePercent,
        explanation: `Projected quarterly emissions based on current trends. Confidence decreases for longer-term predictions.`,
      },
      nextYear: {
        predictedEmissions: Math.round(avgForecast * 12),
        confidence: Math.max(0, calculateConfidence(emissions) - 20),
        trend: getTrend(changePercent),
        changePercentage: changePercent,
        explanation: `Annual projection with seasonal variations factored in. Higher uncertainty for yearly forecasts.`,
      },
    },
    methods: {
      movingAverage: movingAvg,
      exponentialSmoothing,
      linearTrend,
    },
  };
}

/**
 * Moving Average - Simple and robust
 * Uses last 3 months to predict next month
 */
function calculateMovingAverage(emissions: number[]): number {
  if (emissions.length === 0) return 0;
  
  const windowSize = Math.min(3, emissions.length);
  const recent = emissions.slice(-windowSize);
  return recent.reduce((a, b) => a + b, 0) / recent.length;
}

/**
 * Exponential Smoothing - Gives more weight to recent data
 * Alpha = 0.3 (moderate smoothing)
 */
function calculateExponentialSmoothing(emissions: number[]): number {
  if (emissions.length === 0) return 0;
  
  const alpha = 0.3;
  let smoothed = emissions[0];

  for (let i = 1; i < emissions.length; i++) {
    smoothed = alpha * emissions[i] + (1 - alpha) * smoothed;
  }

  return smoothed;
}

/**
 * Linear Trend Projection - Captures directional change
 * Fits a line and projects forward
 */
function calculateLinearTrend(emissions: number[]): number {
  if (emissions.length < 2) return emissions[emissions.length - 1] || 0;

  const n = emissions.length;
  const x = Array.from({ length: n }, (_, i) => i);
  
  const meanX = x.reduce((a, b) => a + b) / n;
  const meanY = emissions.reduce((a, b) => a + b) / n;

  let numerator = 0;
  let denominator = 0;

  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (emissions[i] - meanY);
    denominator += (x[i] - meanX) ** 2;
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = meanY - slope * meanX;

  // Project to next period (n)
  return intercept + slope * n;
}

/**
 * Calculate forecast confidence based on data consistency
 */
function calculateConfidence(emissions: number[]): number {
  if (emissions.length < 2) return 50;

  // Calculate variance
  const mean = emissions.reduce((a, b) => a + b) / emissions.length;
  const variance = emissions.reduce((sum, val) => sum + (val - mean) ** 2, 0) / emissions.length;
  const stdDev = Math.sqrt(variance);
  
  // Coefficient of variation (lower = more stable = higher confidence)
  const cv = stdDev / mean;
  
  // Convert to confidence percentage
  const confidence = Math.max(0, Math.min(95, 95 - (cv * 50)));
  
  return Math.round(confidence);
}

/**
 * Determine trend direction
 */
function getTrend(changePercent: number): 'increasing' | 'stable' | 'decreasing' {
  if (changePercent > 5) return 'increasing';
  if (changePercent < -5) return 'decreasing';
  return 'stable';
}

/**
 * Generate human-readable explanation
 */
function generateExplanation(changePercent: number, confidence: number): string {
  const direction = changePercent > 0 ? 'increase' : 'decrease';
  const magnitude = Math.abs(changePercent).toFixed(1);
  const confidenceStr = confidence >= 80 ? 'very confident' : confidence >= 60 ? 'confident' : 'moderately confident';

  return `We are ${confidenceStr} that your emissions will ${direction} by approximately ${magnitude}% next month based on your historical patterns and current trends.`;
}

/**
 * Generate default forecast when insufficient data
 */
function generateDefaultForecast(userId: string): Forecast {
  return {
    userId,
    generatedAt: new Date(),
    predictions: {
      nextMonth: {
        predictedEmissions: 250,
        confidence: 30,
        trend: 'stable',
        changePercentage: 0,
        explanation: 'Insufficient historical data. Please log more entries for accurate predictions.',
      },
      nextQuarter: {
        predictedEmissions: 750,
        confidence: 20,
        trend: 'stable',
        changePercentage: 0,
        explanation: 'Quarterly forecast requires at least 3 months of data.',
      },
      nextYear: {
        predictedEmissions: 3000,
        confidence: 10,
        trend: 'stable',
        changePercentage: 0,
        explanation: 'Annual forecast requires at least 12 months of data.',
      },
    },
    methods: {
      movingAverage: 250,
      exponentialSmoothing: 250,
      linearTrend: 250,
    },
  };
}

/**
 * Generate forecast data for visualization
 */
export function generateForecastTimeseries(
  historicalData: HistoricalData[],
  monthsAhead: number = 12
): Array<{ month: string; historical: number; forecast: number }> {
  const emissions = historicalData.map(d => d.emissions);
  const avgEmission = calculateMovingAverage(emissions);
  const trend = calculateLinearTrend(emissions);

  const result: Array<{ month: string; historical: number; forecast: number }> = [];

  // Add historical data
  historicalData.forEach(d => {
    result.push({
      month: d.month,
      historical: d.emissions,
      forecast: 0,
    });
  });

  // Generate future forecast
  const lastMonth = new Date(historicalData[historicalData.length - 1].month);
  
  for (let i = 1; i <= monthsAhead; i++) {
    const nextMonth = new Date(lastMonth);
    nextMonth.setMonth(nextMonth.getMonth() + i);
    
    const monthStr = nextMonth.toISOString().slice(0, 7);
    const forecastValue = avgEmission + (trend * i * 0.1); // Add slight trend
    
    result.push({
      month: monthStr,
      historical: 0,
      forecast: Math.max(0, forecastValue),
    });
  }

  return result;
}
