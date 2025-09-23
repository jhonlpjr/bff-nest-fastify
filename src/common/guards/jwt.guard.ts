import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwksService } from '../services/jwks.service';

export interface JwtUserPayload extends JwtPayload {
  sub: string;
  mfa_verified?: boolean;
  [key: string]: any;
}

// Extiende FastifyRequest para agregar user y cookies
declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtUserPayload;
  cookies: { [cookieName: string]: string | undefined };
  }
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwksService: JwksService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const token = req.cookies?.at;
    if (!token) throw new UnauthorizedException('Missing access token');
    const publicKey = this.jwksService.getPublicKey();
    if (!publicKey) throw new UnauthorizedException('Public key not loaded');
    try {
      const payload = jwt.verify(token, publicKey, { algorithms: ['ES256'] }) as JwtUserPayload;
      req.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}