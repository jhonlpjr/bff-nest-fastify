import { LoginResDto } from "./dtos/login-res.dto";
import { MfaLoginResDTO } from "./dtos/mfa-login-res.dto";

export interface AuthApiPort {
  login(params: { username: string; password: string }): Promise<LoginResDto | MfaLoginResDTO>;
  refreshToken(params: { userId: string; refreshToken: string }): Promise<{
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    aud: string;
    user_id: string;
  }>;
  verifyMfa(params: { token: string; login_tx?: string }): Promise<{ verified: boolean }>;
  setupTotp(accessToken: string): Promise<{ otpauthUrl: string }>;
  activateTotp(accessToken: string, token: string): Promise<{ activated: boolean }>;
  revoke(params: { jti?: string; userId?: string }): Promise<void>;
}
