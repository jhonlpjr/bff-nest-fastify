export class MfaLoginResDTO {
  step: string;
  login_tx: string;
  mfa: { types: string[] };
}