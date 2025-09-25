import { httpClient } from '@/app/core/api';

export const ActivitiesService = {
  listByModule: async (moduleId: number) => {
    const res = await httpClient.get(`/activities/module/${moduleId}`);
    return res.data;
  },
  getById: async (id: number) => {
    const res = await httpClient.get(`/activities/${id}`);
    return res.data;
  },
};


