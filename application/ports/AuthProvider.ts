// AuthProvider: integra con Auth Service externo
export interface AuthProvider {
  login(username: string, password: string): Promise<{
    accessToken: string;
    refreshTokenJti: string;
    userId: string;
    mfaRequired?: boolean;
  }>;
  verifyMfa(userId: string, code: string): Promise<{
    accessToken: string;
    refreshTokenJti: string;
  }>;
  refresh(refreshTokenJti: string): Promise<{
    accessToken: string;
    newRefreshTokenJti: string;
    reused: boolean;
  }>;
  revoke(refreshTokenJti: string): Promise<void>;
}
