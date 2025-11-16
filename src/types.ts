export enum InsultType {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Annual = 'annual',
}

export interface InsultSettings {
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  letterSpacing: number;
  wordSpacing: number;
  paragraphCount: number;
}

export const DEFAULT_SETTINGS: InsultSettings = {
  fontFamily: "'VT323', monospace",
  fontSize: 2,
  fontColor: '#EF4444',
  letterSpacing: 0.05,
  wordSpacing: 0.1,
  paragraphCount: 1,
};