import { LoginPortResponse } from "../ports/responses/login-port.res";
import { MfaLoginPortResponse } from "../ports/responses/mfa-login-port.res";
import { LoginFunctions } from "../functions/login.functions";
import { BadRequestException } from "@nestjs/common";
import { LoginResult } from "../dtos/results/login.result";
import { MfaLoginResult } from "../dtos/results/mfa-login.result";

export namespace LoginMapper {
    export function toResult(dto: LoginPortResponse | MfaLoginPortResponse): LoginResult | MfaLoginResult {
        if (LoginFunctions.Validations.isLoginPortResponse(dto)) {
            // LoginResDto: respuesta de login exitoso
            return {
                accessToken: dto.accessToken,
                refreshToken: dto.refreshToken,
                expiresIn: dto.expiresIn,
                tokenType: dto.tokenType,
                userId: dto.userId,
                scope: dto.scope,
                aud: dto.aud,
            } as LoginResult;
        }
        if (LoginFunctions.Validations.isMfaLoginPortResponse(dto)) {
            // MfaLoginResDTO: respuesta de MFA requerido
            return {
                step: dto.step,
                login_tx: dto.login_tx,
                mfa: dto.mfa,
            } as MfaLoginResult;
        }
        throw new BadRequestException('Invalid login response DTO');
    }
}