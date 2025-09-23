export class LoginPortResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    userId: string;
    scope?: string;
    aud?: string;
    atSet?: boolean;
    rtSet?: boolean;
}