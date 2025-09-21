import { MfaLoginResDTO } from '../../interface/http/dto/responses/mfa-login.res.dto';

import { LoginResDto } from '../../interface/http/dto/responses/login.res.dto';
import { TokenPair } from '../../domain/entities/token-pair.entity';


/**
 * Mapea el resultado de login (TokenPair o MfaLoginResDTO) al DTO correcto para la respuesta HTTP.
 */
export function mapLoginResponse(result: TokenPair | MfaLoginResDTO | undefined): LoginResDto | MfaLoginResDTO {
    if (!result) return {} as any;
    if ('accessToken' in result) {
        return toLoginResDto(result as TokenPair);
    }
    return result as MfaLoginResDTO;
}
/**
 * Mapea un TokenPair de dominio a LoginResDto para la capa HTTP.
 */
export const toLoginResDto = (tokenPair: TokenPair): LoginResDto => ({
    userId: tokenPair.userId ?? '',
    accessToken: tokenPair.accessToken ?? '',
    expiresIn: tokenPair.expiresIn ?? 0,
    scope: tokenPair.scope ?? '',
    aud: tokenPair.aud ?? '',
    tokenType: tokenPair.tokenType ?? '',
    atSet: true,
    rtSet: true,
});

/**
 * Mapea la respuesta cruda del Auth Service a un TokenPair de dominio.
 */
export const toTokenPair = (d: { access_token: string; expires_in: number; scope: string; aud: string; user_id: string; token_type: string }): TokenPair =>
    new TokenPair(
        d.access_token,
        d.expires_in,
        d.scope,
        d.aud,
        d.user_id,
        d.token_type
    );

/**
 * Mapea la respuesta de verificación MFA a un resultado tipado.
 */
export const toMfaResult = (d: { ok?: boolean; factorId?: string | null }) => ({
    verified: !!d.ok,
    factorId: d.factorId ?? null,
});
