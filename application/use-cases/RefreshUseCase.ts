import { AuthProvider } from '../ports/AuthProvider';
import { SessionRepository } from '../ports/SessionRepository';
import { Clock } from '../ports/Clock';

export class RefreshUseCase {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly sessionRepo: SessionRepository,
    private readonly clock: Clock
  ) {}

  async execute(sessionId: string) {
    // ...implementación de refresh y manejo de reuse...
  }
}
