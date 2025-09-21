import { Inject } from '@nestjs/common';
import { AuthApiPort } from '../ports/auth-api.port';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';

export class ActivateTotpUseCase {
  constructor(@Inject(AUTH_HTTP_ADAPTER) private readonly authApi: AuthApiPort) {}

  async execute(accessToken: string, token: string) {
    return this.authApi.activateTotp(accessToken, token);
  }
}
