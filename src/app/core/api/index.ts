import axios, { AxiosInstance } from 'axios';
import { environment } from '@/environments/environment';

const TIMEOUT_MS: number = 3000;

export const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: environment.apiUrl,
    timeout: TIMEOUT_MS,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return client;
};

export const httpClient = createHttpClient();
