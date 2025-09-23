import { LoginPortResponse } from "../../../application/ports/responses/login-port.res";
import { LoginResDto } from "../dtos/responses/login.res.dto";
import { MfaLoginPortResponse } from "../../../application/ports/responses/mfa-login-port.res";
import { MfaLoginResDTO } from "../dtos/responses/mfa-login.res.dto";
import { LoginFunctions } from "../../../application/functions/login.functions";
import { BadRequestException } from "@nestjs/common";
import { LoginRequestDto } from "../dtos/requests/login-request.dto";
import { LoginParams } from "../../../application/dtos/params/login.params";

export namespace ApiLoginMapper {
    export function fromBody(body: LoginRequestDto): LoginParams {
        return {
            username: body.username,
            password: body.password,
        };
    }
    export function toResponse(dto: LoginPortResponse | MfaLoginPortResponse): LoginResDto | MfaLoginResDTO {
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
                atSet: typeof dto.atSet === 'boolean' ? dto.atSet : true,
                rtSet: typeof dto.rtSet === 'boolean' ? dto.rtSet : true,
            } as LoginResDto;
        }
        if (LoginFunctions.Validations.isMfaLoginPortResponse(dto)) {
            // MfaLoginResDTO: respuesta de MFA requerido
            return {
                step: dto.step,
                login_tx: dto.login_tx,
                mfa: dto.mfa,
            } as MfaLoginResDTO;
        }
        throw new BadRequestException('Invalid login response DTO');
    }
}