import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  const token = localStorage.getItem('portfolio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getErrorMessage(err, fallback = 'Something went wrong') {
  if (err?.code === 'ERR_NETWORK' || err?.message === 'Network Error') {
    return 'Cannot reach the server. Check that the API is running and CORS / API URL settings.';
  }
  const msg =
    err?.response?.data?.message ||
    err?.response?.data?.errors?.[0]?.msg ||
    err?.message;
  return typeof msg === 'string' ? msg : fallback;
}
