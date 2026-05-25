/**
 * Auto-incrementing "season" indicator used in the masthead and hero.
 *
 * Anchor: 17 = Май 2026. Each new calendar month adds 1. So 18 = Июнь 2026,
 * 19 = Июль 2026, 29 = Май 2027, и так далее.
 */

const MONTHS_RU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

// Anchor: May 2026 = Season 17
const BASE_YEAR = 2026;
const BASE_MONTH_INDEX = 4; // May is month index 4 (0-based)
const BASE_SEASON = 17;

export interface SeasonInfo {
  season: number;
  month: string;
  year: number;
}

export function currentSeason(now: Date = new Date()): SeasonInfo {
  const monthsSince =
    (now.getFullYear() - BASE_YEAR) * 12 + (now.getMonth() - BASE_MONTH_INDEX);
  return {
    season: BASE_SEASON + Math.max(0, monthsSince),
    month: MONTHS_RU[now.getMonth()],
    year: now.getFullYear(),
  };
}
