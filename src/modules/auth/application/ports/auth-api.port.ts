import { ActivateTotpPortResponse } from "./responses/activate-totp-port.res";
import { LoginPortResponse } from "./responses/login-port.res";
import { MfaLoginPortResponse } from "./responses/mfa-login-port.res";
import { SetupTotpPortResponse } from "./responses/setup-totp-port.res";
import { LoginPortRequest } from './requests/login-port.request';
import { RefreshTokenPortRequest } from './requests/refresh-token-port.request';
import { VerifyMfaPortRequest } from './requests/verify-mfa-port.request';
import { SetupTotpPortRequest } from './requests/setup-totp-port.request';
import { ActivateTotpPortRequest } from './requests/activate-totp-port.request';
import { RevokePortRequest } from './requests/revoke-port.request';
import { RevokePortResponse } from "./responses/revoke-port.res";

export interface AuthApiPort {
  login(params: LoginPortRequest): Promise<LoginPortResponse | MfaLoginPortResponse>;
  refreshToken(params: RefreshTokenPortRequest): Promise<LoginPortResponse>;
  verifyMfa(params: VerifyMfaPortRequest): Promise<LoginPortResponse>;
  setupTotp(params: SetupTotpPortRequest): Promise<SetupTotpPortResponse>;
  activateTotp(params: ActivateTotpPortRequest): Promise<ActivateTotpPortResponse>;
  revoke(params: RevokePortRequest): Promise<RevokePortResponse>;
}
