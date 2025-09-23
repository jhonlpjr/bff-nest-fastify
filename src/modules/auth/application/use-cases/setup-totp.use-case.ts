
import { SetupTotpParams } from '../dtos/params/setup-totp.params';
import { AuthApiPort } from '../ports/auth-api.port';
import { Inject } from '@nestjs/common';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';


export class SetupTotpUseCase {
  constructor(
    @Inject(AUTH_HTTP_ADAPTER)
    private readonly authApi: AuthApiPort,
  ) {}

  async execute(params: SetupTotpParams) {
    try {
      return await this.authApi.setupTotp(params);
    } catch (error) {
      throw error;
    }
  }
}
