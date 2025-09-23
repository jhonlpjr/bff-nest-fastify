import { LoginPortResponse } from "../ports/responses/login-port.res";
import { MfaLoginPortResponse } from "../ports/responses/mfa-login-port.res";

export namespace LoginFunctions {
    export namespace Validations {
        export function isLoginPortResponse(obj: any): obj is LoginPortResponse {
            return obj && typeof obj.accessToken === 'string';
        }

        export function isMfaLoginPortResponse(obj: any): obj is MfaLoginPortResponse {
            return obj && typeof obj.login_tx === 'string';
        }
    }
}