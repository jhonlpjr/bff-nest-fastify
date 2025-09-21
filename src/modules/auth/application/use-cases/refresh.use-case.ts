import { AuthApiPort } from '../ports/auth-api.port';
import { TokenPair } from '../../domain/entities/token-pair.entity';
import { CookiesService } from '../../../../common/cookies/cookies.service';

export class RefreshUseCase {
  constructor(
    private readonly authApi: AuthApiPort,
    private readonly cookies: CookiesService
  ) {}

  async execute(req: any, res: any) {
    const refreshToken = this.cookies.getRefreshToken(req);
    const userId = this.cookies.getUid(req);
    if (!refreshToken || !userId) throw new Error('Unauthorized');
    const result = await this.authApi.refreshToken({ userId, refreshToken });
    this.cookies.setRefreshToken(res, result.refresh_token);
    const tokenPair = new TokenPair(
      result.access_token,
      result.expires_in,
      result.scope,
      result.aud,
      result.user_id,
      result.token_type
    );
    return tokenPair;
  }
}
