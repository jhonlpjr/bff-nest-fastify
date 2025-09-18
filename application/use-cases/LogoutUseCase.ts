import { AuthProvider } from '../ports/AuthProvider';
import { SessionRepository } from '../ports/SessionRepository';

export class LogoutUseCase {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly sessionRepo: SessionRepository
  ) {}

  async execute(sessionId: string) {
    // ...borrar sesión y revocar refresh token...
  }
}
