import { ApiGateway } from '../ports/ApiGateway';
import { SessionRepository } from '../ports/SessionRepository';
import { AuthProvider } from '../ports/AuthProvider';
import { Clock } from '../ports/Clock';

export class ProxyUseCase {
  constructor(
    private readonly apiGateway: ApiGateway,
    private readonly sessionRepo: SessionRepository,
    private readonly authProvider: AuthProvider,
    private readonly clock: Clock
  ) {}

  async execute(sessionId: string, req: {
    method: string;
    path: string;
    query?: any;
    body?: any;
    headers?: Record<string, string>;
  }) {
    // ...proxy con refresh si AT expiró...
  }
}
