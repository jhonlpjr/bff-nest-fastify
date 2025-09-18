import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import type { CsrfService } from '../../application/ports/CsrfService';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private readonly csrfService: CsrfService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const method = req.method.toUpperCase();
    if (!['POST', 'PATCH', 'DELETE'].includes(method)) return true;
    const csrfCookie = req.cookies?.['XSRF-TOKEN'];
    const csrfHeader = req.headers['x-xsrf-token'] as string;
    const origin = req.headers['origin'] || req.headers['referer'];
    if (!this.csrfService.isAllowedOrigin(origin as string)) throw new ForbiddenException('Origin not allowed');
    if (!this.csrfService.validate(csrfCookie, csrfHeader)) throw new ForbiddenException('Invalid CSRF token');
    return true;
  }
}
