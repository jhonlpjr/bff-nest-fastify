
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { AuthApiPort } from '../../../application/ports/auth-api.port';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthApiHttpAdapter implements AuthApiPort {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService
  ) {
    // Registrar interceptor de Axios para agregar X-Client-Key
    this.http.axiosRef.interceptors.request.use((config) => {
      const clientKey = this.config.get<string>('BFF_CLIENT_KEY');
      if (clientKey) {
        config.headers = config.headers || {};
        config.headers['X-Client-Key'] = clientKey;
      }
      return config;
    });
  }

  async login(params: { username: string; password: string }) {
    try {
      const res = await firstValueFrom(
        this.http.post<any>('/login', params)
      );
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(params: { userId: string; refreshToken: string }) {
    try {
      const res = await firstValueFrom(
        this.http.post<any>('/refresh-token', params)
      );
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyMfa(params: { token: string; login_tx?: string }) {
    try {
      const res = await firstValueFrom(
        this.http.post<any>('/mfa/verify', params)
      );
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async setupTotp(accessToken: string) {
    try {
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const res = await firstValueFrom(
        this.http.post<any>('/mfa/totp/setup', {}, config)
      );
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async activateTotp(accessToken: string, token: string) {
    try {
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const res = await firstValueFrom(
        this.http.post<any>('/mfa/totp/activate', { token }, config)
      );
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }

  async revoke(params: { jti?: string; userId?: string }) {
    try {
      await firstValueFrom(this.http.post<any>('/revoke', params));
    } catch (error) {
      throw error;
    }
  }
}
