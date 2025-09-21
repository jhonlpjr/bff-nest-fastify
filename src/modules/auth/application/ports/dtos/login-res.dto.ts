export class LoginResDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    userId: string;
    scope?: string;
    aud?: string;
}