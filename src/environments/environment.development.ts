export const environment = {
  production: false,
  apiUrl: (typeof import.meta !== 'undefined' && import.meta.env?.['VITE_API_BASE_URL']) || 'http://localhost:9000/api',
};
