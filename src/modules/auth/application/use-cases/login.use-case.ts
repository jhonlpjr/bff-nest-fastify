import { AuthApiPort } from '../ports/auth-api.port';
import { Inject } from '@nestjs/common';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';
import { LoginParams } from '../dtos/params/login.params';
import { LoginMapper } from '../mappers/login.mapper';

export class LoginUseCase {
  constructor(
    @Inject(AUTH_HTTP_ADAPTER)
    private readonly authApi: AuthApiPort
  ) { }

  async execute(params: LoginParams) {
    try {
      const result = await this.authApi.login(params);
      return LoginMapper.toResult(result);
    } catch (error) {
      throw error;
    }
  }
}
