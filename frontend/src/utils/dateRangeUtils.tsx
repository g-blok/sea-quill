import { subDays, startOfMonth, endOfToday } from 'date-fns';

export const getDateRange = (range: string): [Date, Date] => {
  const today = new Date();

  switch (range) {
    case 'LAST_90_DAYS':
      return [subDays(today, 90), today];
    case 'LAST_60_DAYS':
      return [subDays(today, 60), today];
    case 'LAST_30_DAYS':
      return [subDays(today, 30), today];
    case 'CURRENT_MONTH':
      return [startOfMonth(today), today];
    default:
      return [today, today];
  }
};
