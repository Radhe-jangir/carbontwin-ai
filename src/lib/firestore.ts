import { collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { User, CarbonProfile, Recommendation, AnalyticsData } from '@/types';

/**
 * User Operations
 */
export async function saveUserProfile(user: User): Promise<void> {
  try {
    await setDoc(doc(db, 'users', user.id), user, { merge: true });
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
}

export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    return docSnap.exists() ? (docSnap.data() as User) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

/**
 * Carbon Profile Operations
 */
export async function saveCarbonProfile(profile: CarbonProfile): Promise<void> {
  try {
    const docId = `${profile.userId}_${profile.month}`;
    await setDoc(doc(db, 'carbonProfiles', docId), profile, { merge: true });
  } catch (error) {
    console.error('Error saving carbon profile:', error);
    throw error;
  }
}

export async function getCarbonProfile(
  userId: string,
  month: string
): Promise<CarbonProfile | null> {
  try {
    const docId = `${userId}_${month}`;
    const docSnap = await getDoc(doc(db, 'carbonProfiles', docId));
    return docSnap.exists() ? (docSnap.data() as CarbonProfile) : null;
  } catch (error) {
    console.error('Error getting carbon profile:', error);
    throw error;
  }
}

export async function getUserCarbonProfiles(userId: string): Promise<CarbonProfile[]> {
  try {
    const q = query(collection(db, 'carbonProfiles'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as CarbonProfile);
  } catch (error) {
    console.error('Error getting user carbon profiles:', error);
    throw error;
  }
}

/**
 * Forecast Operations
 */
export async function saveForecast(forecast: any): Promise<void> {
  try {
    const docId = `${forecast.userId}_${new Date().toISOString().slice(0, 7)}`;
    await setDoc(doc(db, 'forecasts', docId), forecast, { merge: true });
  } catch (error) {
    console.error('Error saving forecast:', error);
    throw error;
  }
}

export async function getLatestForecast(userId: string) {
  try {
    const q = query(collection(db, 'forecasts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const forecasts = querySnapshot.docs.map(doc => doc.data());
    return forecasts.sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())[0];
  } catch (error) {
    console.error('Error getting latest forecast:', error);
    throw error;
  }
}

/**
 * Recommendations Operations
 */
export async function saveRecommendations(userId: string, recommendations: Recommendation[]): Promise<void> {
  try {
    const docId = `${userId}_${new Date().toISOString().slice(0, 7)}`;
    await setDoc(doc(db, 'recommendations', docId), { userId, recommendations, createdAt: new Date() }, { merge: true });
  } catch (error) {
    console.error('Error saving recommendations:', error);
    throw error;
  }
}

export async function getRecommendations(userId: string): Promise<Recommendation[]> {
  try {
    const q = query(collection(db, 'recommendations'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const allRecs = querySnapshot.docs.flatMap(doc => (doc.data().recommendations || []) as Recommendation[]);
    return allRecs.filter(r => !r.dismissed);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
}

/**
 * Analytics Operations
 */
export async function saveAnalyticsData(analytics: AnalyticsData): Promise<void> {
  try {
    const docId = `${analytics.userId}_${analytics.period}`;
    await setDoc(doc(db, 'analytics', docId), analytics, { merge: true });
  } catch (error) {
    console.error('Error saving analytics:', error);
    throw error;
  }
}

export async function getAnalyticsData(userId: string, period: string): Promise<AnalyticsData | null> {
  try {
    const docId = `${userId}_${period}`;
    const docSnap = await getDoc(doc(db, 'analytics', docId));
    return docSnap.exists() ? (docSnap.data() as AnalyticsData) : null;
  } catch (error) {
    console.error('Error getting analytics:', error);
    throw error;
  }
}

/**
 * Achievements Operations
 */
export async function saveAchievement(userId: string, achievement: any): Promise<void> {
  try {
    const docId = `${userId}_${achievement.id}`;
    await setDoc(doc(db, 'achievements', docId), { userId, ...achievement }, { merge: true });
  } catch (error) {
    console.error('Error saving achievement:', error);
    throw error;
  }
}

export async function getUserAchievements(userId: string) {
  try {
    const q = query(collection(db, 'achievements'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting achievements:', error);
    throw error;
  }
}
