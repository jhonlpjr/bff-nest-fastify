import { ApiGateway } from '../../application/ports/ApiGateway';
import axios from 'axios';
import { getEnv } from '../config/env';

const API_BASE_URL = getEnv('API_BASE_URL');

export class HttpApiGateway implements ApiGateway {
  async call(
    method: string,
    pathWithQuery: string,
    accessToken: string,
    body?: any,
    headers: Record<string, string> = {}
  ): Promise<{ status: number; headers: Record<string, string>; body: any }> {
    const url = `${API_BASE_URL}${pathWithQuery}`;
    try {
      const res = await axios.request({
        url,
        method,
        data: body,
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        validateStatus: () => true,
      });
      // Normalizar headers a Record<string, string>
      const normHeaders: Record<string, string> = {};
      Object.entries(res.headers).forEach(([k, v]) => {
        if (typeof v === 'string') normHeaders[k] = v;
        else if (Array.isArray(v)) normHeaders[k] = v.join(', ');
        else if (v !== undefined && v !== null) normHeaders[k] = String(v);
      });
      return { status: res.status, headers: normHeaders, body: res.data };
    } catch (e) {
      return { status: 500, headers: {}, body: { error: 'Proxy error' } };
    }
  }
}
