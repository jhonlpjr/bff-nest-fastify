import { LoginResDto } from "../ports/dtos/login-res.dto";
import { MfaLoginResDTO } from "../ports/dtos/mfa-login-res.dto";

export namespace LoginFunctions {
    export namespace Validations {
        export function isLoginResDto(obj: any): obj is LoginResDto {
            return obj && typeof obj.accessToken === 'string';
        }

        export function isMfaLoginResDTO(obj: any): obj is MfaLoginResDTO {
            return obj && typeof obj.login_tx === 'string';
        }
    }
}