import { AuthApiPort } from '../ports/auth-api.port';
import { TokenPair } from '../../domain/entities/token-pair.entity';
import { CookiesService } from '../../../../common/cookies/cookies.service';
import { Inject } from '@nestjs/common';
import { AUTH_HTTP_ADAPTER } from '../../infrastructure/providers/types';
import { LoginResDto } from '../ports/dtos/login-res.dto';
import { MfaLoginResDTO } from '../ports/dtos/mfa-login-res.dto';
import { LoginFunctions } from '../functions/login.functions';

export class LoginUseCase {
  constructor(
    @Inject(AUTH_HTTP_ADAPTER)
    private readonly authApi: AuthApiPort,
    private readonly cookies: CookiesService
  ) { }

  async execute(params: { username: string; password: string }, res: any) {
    try {
      const result = await this.authApi.login(params);
      // Set cookie refresh_token (no exponerlo al front)
      if (LoginFunctions.Validations.isLoginResDto(result)) {
        this.cookies.setRefreshToken(res, result.refreshToken);
        // Set cookie uid (firmada) si aplica
        this.cookies.setUid(res, result.userId);
        // Retornar solo los campos públicos
        const tokenPair = new TokenPair(
          result.accessToken,
          result.expiresIn,
          result.userId,
          result.tokenType,
          result.scope,
          result.aud
        );
        return tokenPair;
      }
      // Manejar el caso de respuesta MFA
      else if (LoginFunctions.Validations.isMfaLoginResDTO(result)) {
        return result; // Retorna el objeto MFA tal cual
      }
    } catch (error) {
      // Puedes personalizar el error lanzado si lo deseas
      throw error;
    }
  }
}
