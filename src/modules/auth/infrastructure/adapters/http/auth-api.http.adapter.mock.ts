import { Injectable } from '@nestjs/common';
import { AuthApiPort } from '../../../application/ports/auth-api.port';
import { LoginPortRequest } from '../../../application/ports/requests/login-port.request';
import { LoginPortResponse } from '../../../application/ports/responses/login-port.res';
import { RefreshTokenPortRequest } from '../../../application/ports/requests/refresh-token-port.request';
import { VerifyMfaPortRequest } from '../../../application/ports/requests/verify-mfa-port.request';
import { SetupTotpPortRequest } from '../../../application/ports/requests/setup-totp-port.request';
import { SetupTotpPortResponse } from '../../../application/ports/responses/setup-totp-port.res';
import { ActivateTotpPortRequest } from '../../../application/ports/requests/activate-totp-port.request';
import { ActivateTotpResDto } from '../../../interface/http/dtos/responses/activate-totp.res.dto';
import { RevokePortRequest } from '../../../application/ports/requests/revoke-port.request';
import { RevokePortResponse } from '../../../application/ports/responses/revoke-port.res';

@Injectable()
export class AuthApiHttpAdapterMock implements AuthApiPort {
  async login(params: LoginPortRequest): Promise<LoginPortResponse> {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600,
      tokenType: 'Bearer',
      userId: 'mock-user-id',
      scope: 'openid',
      aud: 'mock-aud',
      atSet: true,
      rtSet: true,
    };
  }
  async refreshToken(params: RefreshTokenPortRequest): Promise<LoginPortResponse> {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600,
      tokenType: 'Bearer',
      userId: 'mock-user-id',
      scope: 'openid',
      aud: 'mock-aud',
      atSet: true,
      rtSet: true,
    };
  }
  async verifyMfa(params: VerifyMfaPortRequest): Promise<LoginPortResponse> {
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600,
      tokenType: 'Bearer',
      userId: 'mock-user-id',
      scope: 'openid',
      aud: 'mock-aud',
      atSet: true,
      rtSet: true,
    };
  }
  async setupTotp(params: SetupTotpPortRequest): Promise<SetupTotpPortResponse> {
    return {
      otpauthUrl: 'otpauth://totp/mock',
    };
  }
  async activateTotp(params: ActivateTotpPortRequest): Promise<ActivateTotpResDto> {
    return {
      activated: true,
    };
  }
  async revoke(params: RevokePortRequest): Promise<RevokePortResponse> {
    return {
      revoked: true,
    };
  }
}
