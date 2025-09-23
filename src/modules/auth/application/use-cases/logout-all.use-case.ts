
import { LogoutParams } from '../dtos/params/logout.params';
import { AuthApiPort } from '../ports/auth-api.port';
import { Inject } from '@nestjs/common';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';

export class LogoutAllUseCase {
  constructor(
    @Inject(AUTH_HTTP_ADAPTER)
    private readonly authApi: AuthApiPort
  ) {}

  async execute(params: LogoutParams) {
    try {
      if (params.userId) {
        await this.authApi.revoke(params);
      }
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
