export class TokenPair {
  constructor(
    public readonly accessToken: string,
    public readonly expiresIn: number,
    public readonly userId: string,
    public readonly tokenType: string,
    public readonly scope?: string,
    public readonly aud?: string,
  ) { }
}
