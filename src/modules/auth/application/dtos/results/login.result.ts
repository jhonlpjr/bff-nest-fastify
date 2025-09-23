export class LoginResult {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    userId: string;
    scope?: string;
    aud?: string;
}