import { AuthApiPort } from '../ports/auth-api.port';
import { CookiesService } from '../../../../common/cookies/cookies.service';

export class LogoutAllUseCase {
  constructor(
    private readonly authApi: AuthApiPort,
    private readonly cookies: CookiesService
  ) {}

  async execute(req: any, res: any) {
    const userId = this.cookies.getUid(req);
    if (userId) await this.authApi.revoke({ userId });
    this.cookies.clearAll(res);
    return { success: true };
  }
}
