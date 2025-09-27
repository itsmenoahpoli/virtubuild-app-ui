import { httpClient } from '@/app/core/api';

export const GamificationService = {
  getMyData: async () => {
    const res = await httpClient.get('/gamification/me');
    return res.data;
  },
  getLeaderboard: async () => {
    const res = await httpClient.get('/gamification/leaderboard');
    return res.data;
  },
  getTopPerformers: async () => {
    const res = await httpClient.get('/gamification/top-performers');
    return res.data;
  },
  getMyRank: async () => {
    const res = await httpClient.get('/gamification/rank/me');
    return res.data;
  },
  checkAchievements: async () => {
    const res = await httpClient.post('/gamification/achievements/check');
    return res.data;
  },
  awardBadge: async (studentId: number, badgeData: any) => {
    const res = await httpClient.post('/gamification/badges/award', { studentId, ...badgeData });
    return res.data;
  }
};
