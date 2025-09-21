import { AxiosError } from 'axios';

export function mapDownstreamError(err: any): { code: string; message: string; details?: any } {
  if (err.isAxiosError) {
    const axiosErr = err as AxiosError;
    const status = axiosErr.response?.status ?? 500;
    const data = axiosErr.response?.data;
    let msg = axiosErr.message || 'Downstream error';
    if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
      msg = data.message;
    }
    return {
      code: `DOWNSTREAM_${status}`,
      message: msg,
      details: data,
    };
  }
  return {
    code: 'INTERNAL_ERROR',
    message: err?.message || 'Internal error',
    details: err,
  };
}
