import axios, { AxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';

export function api(ctx: any) {
  const { 'fluma-whms:token': token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'https://localhost:3333',
  });

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
