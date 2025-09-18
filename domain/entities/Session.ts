// Clean Architecture BFF - Session Entity
export type MfaLevel = 'pwd' | 'mfa';

export class Session {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly accessToken: string,
    public readonly refreshTokenJti: string,
    public readonly mfaLevel: MfaLevel,
    public readonly createdAt: Date,
    public readonly expiresAt: Date
  ) {}

  isExpired(now: Date): boolean {
    return now >= this.expiresAt;
  }
}

// Value Objects y errores de dominio pueden agregarse aquí o en archivos separados si crecen.