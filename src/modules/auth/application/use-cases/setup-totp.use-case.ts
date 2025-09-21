import { AuthApiPort } from '../ports/auth-api.port';

export class SetupTotpUseCase {
  constructor(private readonly authApi: AuthApiPort) {}

  async execute(accessToken: string) {
    return this.authApi.setupTotp(accessToken);
  }
}
