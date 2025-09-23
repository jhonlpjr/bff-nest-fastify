export class MfaLoginResult {
  step: string;
  login_tx: string;
  mfa: { types: string[] };
}