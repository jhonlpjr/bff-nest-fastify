import { Inject } from '@nestjs/common';
import { AuthApiPort } from '../ports/auth-api.port';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';
import { TotpActivateParams } from '../dtos/params/totp-activate.params';
import { ActivateTotpResult } from '../dtos/results/activate-totpt.result';
import { ActivateTotpMapper } from '../mappers/activate-totp.mapper';

export class ActivateTotpUseCase {
  constructor(@Inject(AUTH_HTTP_ADAPTER) private readonly authApi: AuthApiPort) {}

  async execute(params: TotpActivateParams): Promise<ActivateTotpResult> {
    try {
      const result = await this.authApi.activateTotp(params);
      return ActivateTotpMapper.toResult(result);
    } catch (error) {
      // Puedes personalizar el manejo de error según la lógica de negocio
      throw error;
    }
  }
}
