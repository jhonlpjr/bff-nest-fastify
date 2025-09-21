import { AuthApiPort } from '../ports/auth-api.port';

export class VerifyMfaUseCase {
  constructor(private readonly authApi: AuthApiPort) {}

  async execute(params: { token: string; login_tx?: string }) {
    return this.authApi.verifyMfa(params);
  }
}
