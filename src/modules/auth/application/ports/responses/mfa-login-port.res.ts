export class MfaLoginPortResponse {
  step: string;
  login_tx: string;
  mfa: { types: string[] };
}