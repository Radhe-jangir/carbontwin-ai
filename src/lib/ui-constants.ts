import { Leaf, TrendingUp, Zap, ShoppingBag, Trash2, Plane } from 'lucide-react';

export const CATEGORY_ICONS = {
  transport: Leaf,
  electricity: Zap,
  food: ShoppingBag,
  shopping: ShoppingBag,
  waste: Trash2,
  travel: Plane,
};

export const CATEGORY_COLORS = {
  transport: 'from-blue-500 to-blue-600',
  electricity: 'from-yellow-500 to-yellow-600',
  food: 'from-green-500 to-green-600',
  shopping: 'from-purple-500 to-purple-600',
  waste: 'from-orange-500 to-orange-600',
  travel: 'from-red-500 to-red-600',
};

export const CATEGORY_LABELS = {
  transport: 'Transportation',
  electricity: 'Electricity',
  food: 'Food',
  shopping: 'Shopping',
  waste: 'Waste',
  travel: 'Travel',
};

export const ECO_SCORE_COLORS = {
  excellent: 'text-green-600 bg-green-100',
  good: 'text-emerald-600 bg-emerald-100',
  moderate: 'text-yellow-600 bg-yellow-100',
  poor: 'text-red-600 bg-red-100',
};

export const TREND_COLORS = {
  increasing: 'text-red-600',
  stable: 'text-blue-600',
  decreasing: 'text-green-600',
};

export const PERSONA_ICONS = {
  eco_beginner: '🌱',
  conscious_consumer: '🛍️',
  green_commuter: '🚴',
  sustainability_enthusiast: '🌿',
  climate_champion: '♻️',
};

export const PERSONA_COLORS = {
  eco_beginner: 'from-red-500 to-orange-500',
  conscious_consumer: 'from-yellow-500 to-orange-500',
  green_commuter: 'from-yellow-500 to-green-500',
  sustainability_enthusiast: 'from-green-500 to-emerald-500',
  climate_champion: 'from-emerald-500 to-cyan-500',
};

export const DIFFICULTY_COLORS = {
  easy: 'text-green-600 bg-green-100',
  moderate: 'text-yellow-600 bg-yellow-100',
  hard: 'text-red-600 bg-red-100',
};

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
