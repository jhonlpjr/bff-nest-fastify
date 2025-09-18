import { CsrfService } from '../../application/ports/CsrfService';
import crypto from 'crypto';
import { getEnv } from '../config/env';

const ALLOWED_ORIGINS = getEnv('ALLOWED_ORIGINS').split(',');

export class CsrfServiceImpl implements CsrfService {
  issue() {
    const value = crypto.randomBytes(32).toString('base64url');
    return Promise.resolve({ cookie: value, value });
  }
  validate(cookieVal: string, headerVal: string): boolean {
    if (!cookieVal || !headerVal) return false;
    return crypto.timingSafeEqual(Buffer.from(cookieVal), Buffer.from(headerVal));
  }
  isAllowedOrigin(originOrReferer: string): boolean {
    return ALLOWED_ORIGINS.includes(originOrReferer);
  }
}
