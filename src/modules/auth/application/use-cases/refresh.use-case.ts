import { Inject } from '@nestjs/common';
import { RefreshParams } from '../dtos/params/refresh.params';
import { AuthApiPort } from '../ports/auth-api.port';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';
import { UnauthorizedError } from '../../../../common/exceptions/unauthorized-error';

export class RefreshUseCase {
  constructor(
    @Inject(AUTH_HTTP_ADAPTER)
    private readonly authApi: AuthApiPort
  ) { }

  async execute(dto: RefreshParams) {
    try {
      const { refreshToken, userId } = dto;
      if (!refreshToken || !userId) throw new UnauthorizedError('Invalid refresh token or user ID');
      const result = await this.authApi.refreshToken({ userId, refreshToken });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
