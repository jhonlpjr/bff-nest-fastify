import { Inject } from '@nestjs/common';
import { AuthApiPort } from '../ports/auth-api.port';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';
import { MfaVerifyParams } from '../dtos/params/mfa-verify.params';
import { VerifyMfaMapper } from '../mappers/verify-mfa.mapper';

export class VerifyMfaUseCase {
  constructor(@Inject(AUTH_HTTP_ADAPTER) private readonly authApi: AuthApiPort) { }

  async execute(params: MfaVerifyParams) {
    try {
      const result = await this.authApi.verifyMfa(params);
      return VerifyMfaMapper.toResult(result);
    } catch (error) {
      throw error;
    }
  }
}
