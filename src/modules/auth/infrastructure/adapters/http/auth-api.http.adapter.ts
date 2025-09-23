import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { AuthApiPort } from '../../../application/ports/auth-api.port';
import { firstValueFrom } from 'rxjs';
import { ActivateTotpResDto } from '../../../interface/http/dtos/responses/activate-totp.res.dto';
import { ENV } from '../../../../../common/constants/environments.constants';
import { HeaderKeys } from '../../../../../common/constants/headers.constants';
import { LoginPortResponse } from '../../../application/ports/responses/login-port.res';
import { MfaLoginPortResponse } from '../../../application/ports/responses/mfa-login-port.res';
import { AuthServicePortResponse } from '../../../application/ports/responses/auth-service-port.res';
import { SetupTotpPortResponse } from '../../../application/ports/responses/setup-totp-port.res';
import { LoginPortRequest } from '../../../application/ports/requests/login-port.request';
import { RefreshTokenPortRequest } from '../../../application/ports/requests/refresh-token-port.request';
import { VerifyMfaPortRequest } from '../../../application/ports/requests/verify-mfa-port.request';
import { SetupTotpPortRequest } from '../../../application/ports/requests/setup-totp-port.request';
import { ActivateTotpPortRequest } from '../../../application/ports/requests/activate-totp-port.request';
import { RevokePortResponse } from '../../../application/ports/responses/revoke-port.res';
import { RevokePortRequest } from '../../../application/ports/requests/revoke-port.request';


@Injectable()
export class AuthApiHttpAdapter implements AuthApiPort {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService
  ) {
    // Registrar interceptor de Axios para agregar X-Client-Key
    this.http.axiosRef.interceptors.request.use((config) => {
      const clientKey = this.config.get<string>(ENV.AUTH_SERVICE_CLIENT_KEY);
      if (clientKey) {
        config.headers = config.headers || {};
        config.headers[HeaderKeys.X_CLIENT_KEY] = clientKey;
      }
      return config;
    });
  }

  async login(params: LoginPortRequest): Promise<LoginPortResponse | MfaLoginPortResponse> {
    try {
      const res: AuthServicePortResponse<LoginPortResponse | MfaLoginPortResponse> = (await firstValueFrom(
        this.http.post<any>('/login', params)
      )).data;
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(params: RefreshTokenPortRequest): Promise<LoginPortResponse> {
    try {
      const res: AuthServicePortResponse<LoginPortResponse> = (await firstValueFrom(
        this.http.post<any>('/refresh-token', params)
      )).data;
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyMfa(params: VerifyMfaPortRequest): Promise<LoginPortResponse> {
    try {
      const res: AuthServicePortResponse<LoginPortResponse> = (await firstValueFrom(
        this.http.post<any>('/mfa/verify', params)
      )).data;
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async setupTotp(params: SetupTotpPortRequest): Promise<SetupTotpPortResponse> {
    try {
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${params.accessToken}` },
      };
      const res: AuthServicePortResponse<SetupTotpPortResponse> = (await firstValueFrom(
        this.http.post<any>('/mfa/totp/setup', {}, config)
      )).data;
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async activateTotp(params: ActivateTotpPortRequest): Promise<ActivateTotpResDto> {
    try {
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${params.token}` },
      };
      const res: AuthServicePortResponse<ActivateTotpResDto> = (await firstValueFrom(
        this.http.post<any>('/mfa/totp/activate', { token: params.token }, config)
      )).data;
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async revoke(params: RevokePortRequest): Promise<RevokePortResponse> {
    try {
      const res: AuthServicePortResponse<RevokePortResponse> = (await firstValueFrom(
        this.http.post<any>('/revoke', params)
      )).data;
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
