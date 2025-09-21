import { AuthApiPort } from '../ports/auth-api.port';
import { CookiesService } from '../../../../common/cookies/cookies.service';

export class LogoutUseCase {
  constructor(
    private readonly authApi: AuthApiPort,
    private readonly cookies: CookiesService
  ) {}

  async execute(req: any, res: any) {
    const jti = req.user?.jti; // O extraer del access token
    if (jti) await this.authApi.revoke({ jti });
    this.cookies.clearAll(res);
    return { success: true };
  }
}
