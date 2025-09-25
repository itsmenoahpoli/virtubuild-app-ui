import { httpClient } from '@/app/core/api';

export const AssessmentsService = {
  getByModule: async (moduleId: number) => {
    const res = await httpClient.get(`/assessments/module/${moduleId}`);
    return res.data;
  },
  upsert: async (moduleId: number, quiz: any) => {
    const res = await httpClient.put(`/assessments/module/${moduleId}`);
    return res.data;
  },
};


