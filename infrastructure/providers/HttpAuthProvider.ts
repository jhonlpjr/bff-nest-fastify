import { AuthProvider } from '../../application/ports/AuthProvider';
import axios from 'axios';
import { getEnv } from '../config/env';

const AUTH_BASE_URL = getEnv('AUTH_BASE_URL');

export class HttpAuthProvider implements AuthProvider {
  async login(username: string, password: string) {
    const res = await axios.post(`${AUTH_BASE_URL}/login`, { username, password });
    return res.data;
  }
  async verifyMfa(userId: string, code: string) {
    const res = await axios.post(`${AUTH_BASE_URL}/mfa`, { userId, code });
    return res.data;
  }
  async refresh(refreshTokenJti: string) {
    const res = await axios.post(`${AUTH_BASE_URL}/refresh`, { refreshTokenJti });
    return res.data;
  }
  async revoke(refreshTokenJti: string) {
    await axios.post(`${AUTH_BASE_URL}/revoke`, { refreshTokenJti });
  }
}
