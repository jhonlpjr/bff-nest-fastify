import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import type { JwtUserPayload } from './jwt.guard';

declare module 'express' {
  interface Request {
    user?: JwtUserPayload;
  }
}

@Injectable()
export class MfaGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    if (req.user?.mfa_verified === true) {
      return true;
    }
    throw new ForbiddenException('MFA not verified');
  }
}
