import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { SessionRepository } from '../../application/ports/SessionRepository';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly sessionRepo: SessionRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const sessionId = req.cookies?.['__Host-session'];
    if (!sessionId) throw new UnauthorizedException('No session');
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) throw new UnauthorizedException('Invalid session');
    (req as any).session = session;
    return true;
  }
}
