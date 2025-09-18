import { AuthProvider } from '../ports/AuthProvider';
import { SessionRepository } from '../ports/SessionRepository';
import { CsrfService } from '../ports/CsrfService';
import { Clock } from '../ports/Clock';

export class LoginUseCase {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly sessionRepo: SessionRepository,
    private readonly csrfService: CsrfService,
    private readonly clock: Clock
  ) {}

  async execute(username: string, password: string) {
    const loginResult = await this.authProvider.login(username, password);
    if (loginResult.mfaRequired) {
      return { step: 'mfa' };
    }
    // Crear sesión y emitir CSRF
    // ...implementación...
    return { step: 'done' };
  }
}
