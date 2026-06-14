import { ModelMetrics } from '@/types';

/**
 * Model Monitoring Dashboard: Track system health and accuracy
 * Monitors forecast quality, data integrity, and recommendation effectiveness
 */

export interface MonitoringMetrics {
  forecastConfidence: number;
  predictionStability: number;
  dataQualityScore: number;
  dataCompletenessPercentage: number;
  featureCoverage: number;
  recommendationReliability: number;
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
}

/**
 * Calculate model metrics
 */
export function calculateModelMetrics(
  forecastData: Array<{ predicted: number; actual: number }>,
  dataCompleteness: number,
  featureEngineered: number,
  totalFeatures: number,
  recommendationAcceptanceRate: number
): ModelMetrics {
  // Calculate forecast confidence based on accuracy
  const forecastConfidence = calculateForecastConfidence(forecastData);

  // Calculate prediction stability (variance in predictions)
  const predictionStability = calculatePredictionStability(forecastData);

  // Data quality based on accuracy of input data
  const dataQualityScore = calculateDataQuality(forecastData);

  // Feature coverage percentage
  const featureCoverage = (featureEngineered / totalFeatures) * 100;

  // Recommendation reliability based on acceptance and implementation
  const recommendationReliability = Math.min(
    100,
    recommendationAcceptanceRate * 100
  );

  // Determine overall system health
  const systemHealth = getSystemHealth(
    forecastConfidence,
    predictionStability,
    dataQualityScore,
    dataCompleteness,
    featureCoverage
  );

  return {
    forecastConfidence,
    predictionStability,
    dataQualityScore,
    dataCompletenessPercentage: dataCompleteness,
    featureCoverage,
    recommendationReliability,
    systemHealth,
    lastUpdated: new Date(),
  };
}

/**
 * Calculate forecast confidence from historical accuracy
 */
function calculateForecastConfidence(
  forecastData: Array<{ predicted: number; actual: number }>
): number {
  if (forecastData.length === 0) return 50;

  // Calculate Mean Absolute Percentage Error (MAPE)
  let totalError = 0;

  for (const { predicted, actual } of forecastData) {
    if (actual === 0) continue;
    totalError += Math.abs((predicted - actual) / actual);
  }

  const mape = (totalError / forecastData.length) * 100;

  // Convert MAPE to confidence score (lower error = higher confidence)
  const confidence = Math.max(0, 100 - mape);

  return Math.round(confidence);
}

/**
 * Calculate prediction stability (lower variance = higher stability)
 */
function calculatePredictionStability(
  forecastData: Array<{ predicted: number; actual: number }>
): number {
  if (forecastData.length < 2) return 50;

  const predictions = forecastData.map(d => d.predicted);
  const mean = predictions.reduce((a, b) => a + b) / predictions.length;

  // Calculate coefficient of variation
  const variance = predictions.reduce((sum, val) => sum + (val - mean) ** 2, 0) / predictions.length;
  const stdDev = Math.sqrt(variance);
  const cv = stdDev / mean;

  // Convert to stability score (lower CV = higher stability)
  const stability = Math.max(0, 100 - cv * 100);

  return Math.round(stability);
}

/**
 * Calculate data quality score
 */
function calculateDataQuality(
  forecastData: Array<{ predicted: number; actual: number }>
): number {
  if (forecastData.length === 0) return 0;

  // Quality is based on how well predictions match actuals
  // Using R-squared metric
  const actual = forecastData.map(d => d.actual);
  const predicted = forecastData.map(d => d.predicted);

  const actualMean = actual.reduce((a, b) => a + b) / actual.length;

  const ssRes = actual.reduce(
    (sum, a, i) => sum + (a - predicted[i]) ** 2,
    0
  );

  const ssTot = actual.reduce(
    (sum, a) => sum + (a - actualMean) ** 2,
    0
  );

  const rSquared = 1 - (ssRes / ssTot);

  // Convert R² to 0-100 scale
  return Math.round(Math.max(0, rSquared * 100));
}

/**
 * Determine overall system health
 */
function getSystemHealth(
  forecastConfidence: number,
  predictionStability: number,
  dataQuality: number,
  dataCompleteness: number,
  featureCoverage: number
): 'excellent' | 'good' | 'fair' | 'poor' {
  const avgScore = (
    forecastConfidence +
    predictionStability +
    dataQuality +
    dataCompleteness +
    featureCoverage
  ) / 5;

  if (avgScore >= 85) return 'excellent';
  if (avgScore >= 70) return 'good';
  if (avgScore >= 50) return 'fair';
  return 'poor';
}

/**
 * Generate monitoring alerts
 */
export function generateMonitoringAlerts(metrics: ModelMetrics): string[] {
  const alerts: string[] = [];

  if (metrics.forecastConfidence < 60) {
    alerts.push('⚠️ Forecast confidence is low. More data may be needed for accurate predictions.');
  }

  if (metrics.dataCompletenessPercentage < 70) {
    alerts.push('⚠️ Data completeness is below optimal. Fill in missing entries for better results.');
  }

  if (metrics.featureCoverage < 80) {
    alerts.push('⚠️ Feature coverage is incomplete. Log more activity details for comprehensive analysis.');
  }

  if (metrics.predictionStability < 50) {
    alerts.push('⚠️ Predictions are unstable. Your lifestyle patterns are highly variable.');
  }

  if (metrics.systemHealth === 'poor') {
    alerts.push('❌ System health is poor. Data quality and completeness need improvement.');
  }

  return alerts;
}

/**
 * Get metric descriptions for UI display
 */
export const METRIC_DESCRIPTIONS = {
  forecastConfidence: 'How accurately our model predicts future emissions (0-100)',
  predictionStability: 'Consistency of predictions based on your patterns (0-100)',
  dataQualityScore: 'Quality of data input and tracking accuracy (0-100)',
  dataCompletenessPercentage: 'Percentage of tracked data fields (0-100)',
  featureCoverage: 'How many features are engineered from your data (0-100)',
  recommendationReliability: 'How likely recommendations will achieve stated impact (0-100)',
};
