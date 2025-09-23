import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import type { JwtUserPayload } from './jwt.guard';

@Injectable()
export class MfaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const user = (req as any).user as JwtUserPayload | undefined;
    if (user?.mfa_verified === true) {
      return true;
    }
    throw new ForbiddenException('MFA not verified');
  }
}
