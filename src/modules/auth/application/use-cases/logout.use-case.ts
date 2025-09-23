
import { AuthApiPort } from '../ports/auth-api.port';
import { Inject } from '@nestjs/common';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';
import { LogoutParams } from '../dtos/params/logout.params';

export class LogoutUseCase {
  constructor(
    @Inject(AUTH_HTTP_ADAPTER)
    private readonly authApi: AuthApiPort
  ) {}

  async execute(dto: LogoutParams): Promise<{ success: true }> {
    try {
      if (dto.jti) {
        await this.authApi.revoke({ jti: dto.jti });
      }
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}
