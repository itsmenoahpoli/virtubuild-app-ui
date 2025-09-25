import { httpClient } from '@/app/core/api';
import { Router } from '@angular/router';

const decodeJwt = (token: string): any => {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
  try {
    return JSON.parse(decodeURIComponent(escape(payload)));
  } catch {
    return JSON.parse(payload);
  }
};

export const AuthenticationService = {
  signin: async (
    email: string,
    password: string,
    userType: 'student' | 'admin' | 'instructor'
  ) => {
    const response = await httpClient.post('/auth/signin', {
      email,
      password,
      userType,
    });
    const token = response.data?.authToken;
    if (token) {
      localStorage.setItem('authToken', token);
    }
    const decoded = token ? decodeJwt(token) : null;
    return decoded;
  },
  signout: () => {
    localStorage.removeItem('authToken');
  },
  getToken: () => localStorage.getItem('authToken'),
  getRole: (): string | null => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    const decoded = decodeJwt(token);
    const role = decoded?.user?.roleName || decoded?.user?.role || null;
    return role;
  },
};
