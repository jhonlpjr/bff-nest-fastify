import { Injectable } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';
import * as cookie from 'cookie';
import { REFRESH_TOKEN } from '../constants/keys.constants';

@Injectable()
export class CookiesService {
  constructor(private readonly config: ConfigService) { }


  setRefreshToken(res: FastifyReply, value: string) {
    if (typeof res.setCookie === 'function') {
      res.setCookie(REFRESH_TOKEN, value, {
        httpOnly: true,
        secure: this.config.get('COOKIE_SECURE', process.env.NODE_ENV !== 'development'),
        sameSite: (this.config.get('COOKIE_SAMESITE', 'lax') as 'lax' | 'strict' | 'none'),
        domain: this.config.get('COOKIE_DOMAIN'),
        path: '/',
        maxAge: this.config.get('REFRESH_COOKIE_MAX_AGE_MS') || undefined,
      });
    }
  }

  getRefreshToken(req: FastifyRequest): string | undefined {
    return req.cookies?.[REFRESH_TOKEN];
  }

  setUid(res: FastifyReply, userId: string) {
    if (typeof res.setCookie === 'function') {
      res.setCookie('uid', userId, {
        httpOnly: true,
        signed: true,
        secure: this.config.get('COOKIE_SECURE', process.env.NODE_ENV !== 'development'),
        sameSite: (this.config.get('COOKIE_SAMESITE', 'lax') as 'lax' | 'strict' | 'none'),
        domain: this.config.get('COOKIE_DOMAIN'),
        path: '/',
      });
    }
  }

  getUid(req: FastifyRequest): string | undefined {
    return req.cookies?.uid;
  }

  clearAll(res: FastifyReply) {
    res.clearCookie(REFRESH_TOKEN, { path: '/' });
    res.clearCookie('uid', { path: '/' });
  }
}
