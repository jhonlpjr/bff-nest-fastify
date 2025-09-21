import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import * as cookie from 'cookie';

@Injectable()
export class CookiesService {
  constructor(private readonly config: ConfigService) {}

  private getRefreshCookieName() {
    return this.config.get('REFRESH_COOKIE_NAME', 'refreshToken');
  }

  setRefreshToken(res: Response, value: string) {
    res.cookie(this.getRefreshCookieName(), value, {
      httpOnly: true,
      secure: this.config.get('COOKIE_SECURE', process.env.NODE_ENV !== 'development'),
  sameSite: (this.config.get('COOKIE_SAMESITE', 'lax') as 'lax' | 'strict' | 'none'),
      domain: this.config.get('COOKIE_DOMAIN'),
      path: '/',
      maxAge: this.config.get('REFRESH_COOKIE_MAX_AGE_MS') || undefined,
    });
  }

  getRefreshToken(req: Request): string | undefined {
    return req.cookies?.[this.getRefreshCookieName()];
  }

  setUid(res: Response, userId: string) {
    res.cookie('uid', userId, {
      httpOnly: true,
      signed: true,
      secure: this.config.get('COOKIE_SECURE', process.env.NODE_ENV !== 'development'),
  sameSite: (this.config.get('COOKIE_SAMESITE', 'lax') as 'lax' | 'strict' | 'none'),
      domain: this.config.get('COOKIE_DOMAIN'),
      path: '/',
    });
  }

  getUid(req: Request): string | undefined {
    return req.signedCookies?.uid || req.cookies?.uid;
  }

  clearAll(res: Response) {
    res.clearCookie(this.getRefreshCookieName(), { path: '/' });
    res.clearCookie('uid', { path: '/' });
  }
}
